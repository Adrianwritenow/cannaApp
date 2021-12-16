import { AxiosResponse } from "axios";
import qs from "qs";

var axios = require("axios");

const SEARCH_URL = process.env.SEARCH_URL;

export const SEARCH_POST = "search/post";
var bodybuilder = require("bodybuilder");

export function searchQuery(search: string) {
  var body = bodybuilder().query("query_string", "query", search).build();

  const data = JSON.stringify(body);

  const results = axios({
    url: `${SEARCH_URL}/_search`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  }).then((res: AxiosResponse) => {
    return res.data;
  });

  // const results = axios
  //   .get(`${SEARCH_URL}/_search?`, { params: { q: search } })
  //   .then((res: AxiosResponse) => {
  //     return res.data;
  //   });

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
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    data: id,
  }).then((res: AxiosResponse) => {
    return res.data;
  });

  return results;
}
