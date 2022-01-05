import { AxiosError, AxiosResponse } from 'axios';

var axios = require('axios');
const SEARCH_URL = process.env.SEARCH_URL;

export const SEARCH_REQUEST_GET = 'search/get';
var bodybuilder = require('bodybuilder');

export const receiveResults = (data: any) => ({
  type: SEARCH_REQUEST_GET,
  data,
});

// export function spatialQuery(coords: any, distance: any) {
//   const query = bodybuilder()
//     .query('match_all', {})
//     .filter('geo_distance', {
//       distance: '10km',
//       field_coordinates: { lat: 28.5384, lon: -81.3789 },
//     })
//     .build();

//   const results = axios({
//     url: 'https://search-dev.cannapages.com/elasticsearch_index_dev_cannapages_dispenaries/_search',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     method: 'POST',
//     data: query,
//   }).then((response: AxiosResponse) => response.data);

//   return results;
// }

export function combinedSearchQuery(
  search: string,
  coords?: any,
  distance?: string
) {
  const spatialQuery =
    coords && distance
      ? bodybuilder()
          .query('match_all', {})
          .filter('geo_distance', {
            distance: distance,
            field_coordinates: { lat: coords.lat, lon: coords.lon },
          })
          .build()
      : bodybuilder().query('query_string', 'query', search).build();

  const query = bodybuilder().query('query_string', 'query', search).build();

  const results = axios({
    url: `${SEARCH_URL}/elasticsearch_index_dev_cannapages_index01/_search?size=20`,
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    data: coords && distance ? spatialQuery : query,
  }).then((response: AxiosResponse) =>  response.data);

  return results;
}

export function searchQuery(search: string) {
  var body = bodybuilder().query('query_string', 'query', search).build();

  const data = JSON.stringify(body);

  // const results = axios({
  //   url: `${SEARCH_URL}/_search`,
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   data: data,
  // }).then((res: AxiosResponse) => {
  //   return res.data;
  // });

  const results = axios
    .get(`${SEARCH_URL}/_search?size=6`, { params: { q: search } })
    .then((res: AxiosResponse) => {
      return res.data;
    });

  // const results = axios
  //   .get(`${SEARCH_URL}`, {
  //     params: {
  //       q: data,
  //     },
  //   })
  //   .then((res: AxiosResponse) => {
  //     console.log(res);
  //   });

  return results;
}

export function getDocument(id: string | string[] | undefined) {
  var body = bodybuilder()
    .filter('term', '_id', id as string)
    .build();

  const results = axios({
    url: `${SEARCH_URL}/elasticsearch_index_dev_cannapages_index01/_search?size=1`,
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
