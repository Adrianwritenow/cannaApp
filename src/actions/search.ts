import { AxiosError, AxiosResponse } from 'axios';

import { SearchHits } from '@/interfaces/searchHits';

var axios = require('axios');
const SEARCH_URL = process.env.SEARCH_URL;

export const SEARCH_REQUEST_GET = 'search/get';
var bodybuilder = require('bodybuilder');

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
   * We want to fitler by distance and then sort asceending
   * We choose to use the plane distance type which is faster
   * but innacurate for longer distances and near the poles,
   * which is not a problem for our use case
   */

  if (filters) {
    console.log('FILTERS', filters);
    Object.keys(filters).map(function (key, index) {
      if (key === 'category') {
        if (filters?.category[0]) {
          body.filter('match', 'category', filters.category[0]);
        }
        if (filters?.amenities[0]) {
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

      if (key !== 'category' && key !== 'sort' && filters[key][0]) {
        body.filter('match', `${key}`, filters[key][0]);
      }
    });
  }

  if (coords && coords.lat && coords.lon) {
    body.filter('geo_distance', {
      distance: distance ?? '50mi',
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

  console.log(query);

  let apis: any[] = [];
  let data: any[] = [];

  if (endpoints) {
    if (endpoints.length) {
      apis = endpoints.map(function (value) {
        return `${SEARCH_URL}/elasticsearch_index_dev_cannapages_${value}/_search`;
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
        .then((response: AxiosResponse<SearchHits>[]) => {
          // TODO: Document this please
          let values: any[] = response.map(r => r.data.hits.hits);
          let flatData = [].concat.apply([], values);

          return flatData;
        })
        .catch((error: any) => {
          console.log('ERR:::', error);
        });
      data = results;

      console.log('DATA:::', data);
    }

    return data;
  }

  return data;
}

export function getDocument(id: string | string[] | undefined, api: string) {
  var body = bodybuilder()
    .filter('term', '_id', id as string)
    .build();

  const results = axios({
    url: `${SEARCH_URL}/elasticsearch_index_dev_cannapages_${api}/_search?size=1`,
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

export function getFeatured(index: string) {
  var body = bodybuilder().filter('match', 'featured', true).build();
  const results = axios({
    url: `${SEARCH_URL}/elasticsearch_index_dev_cannapages_${index}/_search?size=1`,
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
  filterOnly?: boolean
) {
  const body = bodybuilder();

  if (!filterOnly) {
    body.filter('match', `${field}`, value);
  }

  if (filter) {
    const value = filter.value ? filter.value : [''];
    body.orQuery('terms', `${filter.key}`, value);
  }

  const query = body.build();

  const results = axios({
    url: `${SEARCH_URL}/elasticsearch_index_dev_cannapages_${index}/_search?size=15`,
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
    url: `${SEARCH_URL}/elasticsearch_index_dev_cannapages_${type}/_search?size=15`,
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
