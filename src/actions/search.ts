import { AxiosResponse } from 'axios';

var axios = require('axios');
const SEARCH_URL = process.env.SEARCH_URL;

export const SEARCH_REQUEST_GET = 'search/get';
var bodybuilder = require('bodybuilder');

export const receiveResults = (data: any) => ({
  type: SEARCH_REQUEST_GET,
  data,
});

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
  const results = axios({
    url: `${SEARCH_URL}/_doc/${encodeURIComponent(id as string)}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: id,
  }).then((res: AxiosResponse) => {
    return res.data;
  });

  return results;
}
