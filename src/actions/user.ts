import { Axios, AxiosError, AxiosResponse } from "axios";

import qs from "qs";

var axios = require("axios");
const API_URL = process.env.API_URL;

interface IAuthState {
  token_type?: string;
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
}

export default function getCurrentUser(token: IAuthState) {
  const data = qs.stringify({
    grant_type: "password",
    client_id: "ec881dc6-d3c8-4475-abe1-fd9605f6cfba",
    client_secret: "secret",
  });

  const config = {
    method: "get",
    url: `${API_URL}/oauth/userinfo`,
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
    data: data,
  };

  return axios(config)
    .then(function (response: AxiosResponse) {
      return response.data;
    })
    .catch(function (error: AxiosError) {
      return error.response;
    });
}
