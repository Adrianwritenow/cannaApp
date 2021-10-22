const API_URL = "https://dev-cannapages.pantheonsite.io";
var axios = require("axios");

import qs from "qs";

export default function login(username: string, password: string) {
  const data = qs.stringify({
    username,
    password,
    grant_type: "password",
    client_id: "ec881dc6-d3c8-4475-abe1-fd9605f6cfba",
    client_secret: "secret",
  });

  const config = {
    method: "post",
    url: `${API_URL}/oauth/token`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
    data: data,
  };
  return axios(config)
    .then(function (response: { data: any }) {
      return response.data;
    })
    .catch(function (error: any) {
      return error.response.data;
    });
}
