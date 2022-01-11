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

export function combinedSearchQuery(searchProps: {
  search: string;
  coords?: any;
  distance?: string;
  filters?: { sort: string; category: string };
  endpoints?: string[];
}) {
  const { search, coords, distance, filters, endpoints } = searchProps;
  const spatialQuery =
    coords && distance
      ? bodybuilder()
          .query('match_all', {})
          .filter('geo_distance', {
            distance: distance,
            coordinates: { lat: coords.lat, lon: coords.lon },
          })
          .size(15)
          .build()
      : bodybuilder().query('query_string', 'query', search).build();

  const query = bodybuilder().query('query_string', 'query', search).size(3);

  if (filters?.category) {
    if (filters?.category[0]) {
      query.filter('match', 'category', filters.category[0]);
    }
  }

  if (filters?.sort) {
    if (filters?.sort[0]) {
      const sort = filters?.sort[0];
      switch (sort) {
        case 'Price: Hight to Low':
          query.sort('price', 'desc');
          break;
        case 'Price: Low to High':
          query.sort('price', 'asc');
          break;
        default:
          break;
      }
    }
  }

  const body = query.build();

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
              data: coords && distance ? spatialQuery : body,
            })
          )
        )
        .then((response: AxiosResponse<SearchHits>[]) => {
          let values: any[] = response.map(r => r.data.hits.hits);
          let flatData = [].concat.apply([], values);

          flatData.sort((a: any, b: any) => (a._score < b._score ? 1 : -1));

          return flatData;
        })
        .catch((error: any) => {
          console.log(error);
        });
      data = results;
    }
    return data;
  }
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

export function getFeatured() {
  var body = bodybuilder().filter('match', 'featured', true).build();
  const results = axios({
    url: `${SEARCH_URL}/elasticsearch_index_dev_cannapages_*/_search?size=1`,
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

export function browseBy(field: string, value: any, index: string) {
  var body = bodybuilder().filter('match', `${field}`, value).build();
  const results = axios({
    url: `${SEARCH_URL}/elasticsearch_index_dev_cannapages_${index}/_search?size=15`,
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
