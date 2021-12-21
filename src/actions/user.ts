import { IAxiosAction } from '@/interfaces/axios';

export const USER_REQUEST_GET = 'user/get';
export const USER_REQUEST_GET_CURRENT = 'user/getCurrent';
export const USER_REQUEST_UPDATE = 'user/update';
export const USER_REQUEST_PASSWORD_RESET = 'user/password';

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
  const url = id === 'me' ? `/rest/me` : `/user/${id}`;

  return {
    type: USER_REQUEST_GET_CURRENT,
    config: {
      method: 'GET',
      url,
    },
  };
}

export function updateUser(
  id: string,
  values: any,
  password?: string
): IAxiosAction {
  const payload: any = {};

  Object.keys(values).map(function (key, index) {
    if (values[key]) {
      payload[`${key}`] = [{ value: values[key] }];
    }
  });

  if (password) {
    payload.password = password;
  }

  const data = JSON.stringify(payload);

  return {
    type: USER_REQUEST_UPDATE,
    config: {
      method: 'patch',
      url: `/user/${id}`,
      data: data,
    },
  };
}
