import { IAxiosAction } from "../interfaces/axios";
<<<<<<< HEAD

var axios = require("axios");
const API_URL = process.env.API_URL;
=======
import qs from "qs";
<<<<<<< HEAD
const API_URL = "https://dev-cannapages.pantheonsite.io";
>>>>>>> [feat]:Add protected routes wrapper and axios interceptor instances
=======
const API_URL = process.env.API_URL;
>>>>>>> fix:remove console.logs and use processENV

export const USER_REQUEST_GET = "user/get";
export const USER_REQUEST_GET_CURRENT = "user/getCurrent";
export const USER_REQUEST_UPDATE = "user/update";
export const USER_REQUEST_PASSWORD_RESET = "user/password";

export interface UpdateUser {
  field_favorite_strains?: string;
  field_first_name?: string;
  field_guest_list?: string;
  field_last_name?: string;
  field_state?: string;
  langcode?: string;
  mail?: string;
  name?: string;
  preferred_langcode?: string;
  timezone?: string;
  user_picture?: File;
}

export function getCurrentUser(id: string): IAxiosAction {
  return {
    type: USER_REQUEST_GET_CURRENT,
    config: {
      method: "GET",
      url: `${API_URL}/user/${id}`,
    },
  };
}

export function updateUser(id: string, values: any): IAxiosAction {
  const payload: any = {};

  Object.keys(values).map(function (key, index) {
    if (values[`${key}`]) {
      payload[`${key}`] = [{ value: values[`${key}`] }];
    }
  });

  const data = JSON.stringify(payload);
  return {
    type: USER_REQUEST_UPDATE,
    config: {
      method: "patch",
      url: `${API_URL}/user/${id}`,
      data: data,
    },
  };
}
