import { Axios, AxiosError, AxiosResponse } from "axios";

import { IAxiosAction } from "../interfaces/axios";

var axios = require("axios");
const API_URL = process.env.API_URL;

export const USER_REQUEST_GET = "user/get";
export const USER_REQUEST_GET_CURRENT = "user/getCurrent";
export const USER_REQUEST_UPDATE = "user/update";
export const USER_REQUEST_PASSWORD_RESET = "user/password";

export function getCurrentUser(): IAxiosAction {
  console.log("SMOKE");
  return {
    type: USER_REQUEST_GET_CURRENT,
    config: {
      method: "GET",
      url: `${API_URL}/oauth/userinfo`,
    },
  };
}
