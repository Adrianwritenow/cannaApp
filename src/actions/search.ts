import { AxiosError, AxiosResponse } from 'axios';

import { Dispensary } from '@/interfaces/dispensary';
import { IAxiosAction } from '@/interfaces/axios';
import { Product } from '@/interfaces/product';
import { SearchHits } from '@/interfaces/searchHits';
import bodybuilder from 'bodybuilder';
import { combinedQueryBody } from '@/helpers/searchQuery';

var axios = require('axios');
const SEARCH_URL = process.env.SEARCH_URL;
const SEARCH_INDEX_PREFIX = process.env.SEARCH_INDEX_PREFIX;

export const SEARCH_REQUEST_GET = 'search/get';
export const SEARCH_REQUEST_GET_DOCUMENTS = 'search/getDocuments';
export const SEARCH_REQUEST_GET_COMBINED = 'search/getCombined';

export const receiveResults = (data: any) => ({
  type: SEARCH_REQUEST_GET,
  data,
});

export async function combinedSearchQuery(searchProps: {
  q?: string;
  coords?: any;
  distance?: string;
  filters?: any;
  total?: number;
  endpoints?: string[];
}) {
  const { q, coords, distance, filters, endpoints, total } = searchProps;

  const body = bodybuilder().size(total ?? 15);

  // If we have a query, we will use query_string
  if (q) {
    body.query('query_string', 'query', q);
  } else if (q == '' || q == '*') {
    body.query('match_all', {});
  }

  /**
   *Goes through filters passed and conditionally adds onto the
   *query to filter out based on key value.
   */

  if (filters) {
    Object.keys(filters).map(function (key, index) {
      if (key === 'category') {
        if (filters?.category[0]) {
          body.filter('match', 'category', filters.category[0]);
        }
        if (filters?.amenities) {
          filters?.amenities.map((filter: string) => {
            body.filter('term', 'amenities', filter);
          });
        }
      }
      if (key === 'sort') {
        if (filters?.sort[0]) {
          const sort = filters?.sort[0];
          switch (sort) {
            case 'Price: High to Low':
              body.sort('price', 'desc');
              break;
            case 'Highest Rated':
              body.sort('rating', 'desc');
              break;
            case 'Largest Menu':
              body.sort('_script', {
                type: 'number',
                script: 'doc.products.size()',
                order: 'desc',
              });
              break;
            case 'Most Reviewed':
              body.sort('reviews_count', 'desc');
              break;
            case 'Price: Low to High':
              body.sort('price', 'asc');
              break;
            case 'Rating':
              body.sort('rating', 'desc');
              break;
            case 'Rating':
              body.sort('rating', 'desc');
              break;
            default:
              break;
          }
        }
      }

      if (
        key !== 'category' &&
        key !== 'sort' &&
        key !== 'productType' &&
        filters[key][0] &&
        filters[key][0] !== 'All'
      ) {
        body.filter('match', `${key}`, filters[key][0]);
      }
    });
  }

  /**
   * We want to fitler by distance and then sort asceending
   * We choose to use the plane distance type which is faster
   * but innacurate for longer distances and near the poles,
   * which is not a problem for our use case
   */

  if (coords && coords.lat && coords.lon) {
    body.filter('geo_distance', {
      distance: distance ?? '200mi',
      coordinates: { lat: coords.lat, lon: coords.lon },
    });

    body.sort('_geo_distance', {
      coordinates: { lat: coords.lat, lon: coords.lon },
      order: 'asc',
      unit: 'mi',
      distance_type: 'plane',
    });
  }

  // Build the body (JSON payload)
  const query = body.build();

  let apis: any[] = [];
  let data: any[] = [];

  // Check endpoints for selective searching,
  // if multiple are given we search through each
  if (endpoints) {
    if (endpoints.length) {
      apis = endpoints.map(function (value) {
        return `${SEARCH_URL}/elasticsearch_index_${SEARCH_INDEX_PREFIX}_${value}/_search`;
      });
    }

    if (apis.length) {
      const results = axios
        .all(
          apis.map(endpoint =>
            axios({
              url: endpoint,
              headers: { 'Content-Type': 'application/json' },
              method: 'POST',
              data: query,
            })
          )
        )
        .then(async (response: AxiosResponse<SearchHits>[]) => {
          // TODO: Document this please

          let values: any[] = response.map(r => r.data.hits.hits);
          let flatData = [].concat.apply([], values);

          let responseData = flatData;

          // Check if filters exists and it has a productType field with a value
          if (filters && filters.productType && filters.productType[0]) {
            let products = flatData
              .map((dispensary: Dispensary) =>
                dispensary._source.products ? dispensary._source.products : []
              )
              .flat(1)
              .filter(productId => productId);

            // With the list of product ids we can now  provide the list to find these products to check their category and the category to filter by
            let primeData = await getBusinessProducts(
              products,
              filters.productType[0]
            ).then((subResponse: SearchHits) => {
              let businessProducts = subResponse.hits.hits;
              // Grab Ids from products to filter through
              let filteredProductIds = businessProducts
                .map((product: Product) => product._source.id)
                .flat(1);

              // Filter through business to see if they have the matching products of filter type
              let businessWithProduct = responseData.filter(
                (business: Dispensary) => {
                  return (
                    business._source.products &&
                    filteredProductIds.some(productId =>
                      business._source.products?.includes(productId)
                    )
                  );
                }
              );

              // Reset value of return data
              primeData = businessWithProduct;
              return primeData;
            });
            responseData = primeData;
          }

          return responseData;
        })
        .catch((error: any) => {
          console.log('ERR:::', error);
        });
      data = results;
    }

    return data;
  }

  return data;
}

export function getDocument(id: string | string[] | undefined, api: string) {
  var body = bodybuilder()
    .filter('term', 'id', id as string)
    .build();

  const results = axios({
    url: `${SEARCH_URL}/elasticsearch_index_${SEARCH_INDEX_PREFIX}_${api}/_search?size=1`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((error: AxiosError) => {
      // dispatch must come before setState
      console.log('ERR:::', error);
    });

  return results;
}

export function getDocuments(
  ids: string[] | number[],
  api: string
): IAxiosAction {
  const data = bodybuilder().filter('terms', 'id', ids).build();

  return {
    type: SEARCH_REQUEST_GET_DOCUMENTS,
    config: {
      method: 'POST',
      url: `${SEARCH_URL}/elasticsearch_index_${SEARCH_INDEX_PREFIX}_${api}/_search`,
      data,
    },
  };
}

export function getFeatured(index: string) {
  var body = bodybuilder().filter('match', 'featured', true).build();
  const results = axios({
    url: `${SEARCH_URL}/elasticsearch_index_${SEARCH_INDEX_PREFIX}_${index}/_search?`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((error: AxiosError) => {
      // dispatch must come before setState
      console.log('ERR:::', error);
    });
  return results;
}

export function browseBy(
  field: string,
  value: any,
  index: string,
  filter?: { key: string; value: any[] },
  sort?: { field: string; direction: string }
) {
  const body = bodybuilder();

  if (field) {
    body.query('match', `${field}`, value);
  } else {
    body.query('query_string', 'query', value);
  }

  if (filter) {
    const value = filter.value ? filter.value : [''];
    body.filter('terms', `${filter.key}`, value);
  }

  if (sort) {
    body.sort(sort.field, sort.direction);
  }

  const query = body.build();

  const results = axios({
    url: `${SEARCH_URL}/elasticsearch_index_${SEARCH_INDEX_PREFIX}_${index}/_search?size=15`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: query,
  })
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((error: AxiosError) => {
      // dispatch must come before setState
      console.log('ERR:::', error);
    });
  return results;
}

export function getBusinessProducts(products: number[], filter?: string) {
  var body = bodybuilder().query('terms', 'id', products);

  // If a category is provided use it to filter by
  if (filter) {
    body.filter('match', 'category', filter);
  }

  const query = body.build();

  const results = axios({
    url: `${SEARCH_URL}/elasticsearch_index_${SEARCH_INDEX_PREFIX}_products/_search`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: query,
  })
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((error: AxiosError) => {
      // dispatch must come before setState
      console.log('ERR:::', error);
    });
  return results;
}

export function getPopular(type: string) {
  var body = {
    query: {
      function_score: {
        query: { match_all: {} },
        boost: '5',
        random_score: {},
        boost_mode: 'multiply',
      },
    },
  };

  const results = axios({
    url: `${SEARCH_URL}/elasticsearch_index_${SEARCH_INDEX_PREFIX}_${type}/_search?size=15`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  })
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((error: AxiosError) => {
      console.log('ERR:::', error);
    });

  return results;
}

interface EndpointProps {
  name: string;
  geolocate?: boolean | undefined;
}

export function searchMulti(searchProps: {
  q?: string;
  coords?: any;
  distance?: string;
  filters?: any;
  total?: number;
  endpoints?: EndpointProps[];
}): IAxiosAction {
  const { q, coords, distance, filters, total, endpoints } = searchProps;

  if (!endpoints || !endpoints.length) {
    throw new Error(
      'You must specify endpoints when searching multiple indexes.'
    );
  }

  let data = '';
  endpoints.forEach((api: EndpointProps) => {
    const index = `elasticsearch_index_${SEARCH_INDEX_PREFIX}_${api.name}`;
    const body = combinedQueryBody({
      q,
      distance,
      filters,
      total,
      coords: !api.geolocate ? undefined : coords,
    });

    data += JSON.stringify({ index }) + '\n';
    data += JSON.stringify(body) + '\n';
  });

  return {
    type: SEARCH_REQUEST_GET_COMBINED,
    config: {
      method: 'POST',
      url: `${SEARCH_URL}/_msearch`,
      headers: {
        'Content-Type': 'application/x-ndjson',
      },
      data,
    },
  };
}
