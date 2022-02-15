import { IAxiosAction } from '@/interfaces/axios';

export const USER_REQUEST_GET = 'user/get';
export const USER_REQUEST_GET_CURRENT = 'user/getCurrent';
export const USER_REQUEST_UPDATE = 'user/update';
export const USER_REQUEST_LOST_PASSWORD = 'user/lostPassword';
export const USER_REQUEST_LOST_PASSWORD_RESET = 'user/lostPasswordReset';
export const USER_REQUEST_LOGOUT = 'user/logout';

export interface UpdateUser {
  favorite_strains?: string;
  field_first_name?: string;
  field_last_name?: string;
  field_state?: string;
  field_country?: string;
  field_phone?: string;
  guest_list?: string;
  langcode?: string;
  mail?: string;
  name?: string;
  preferred_langcode?: string;
  timezone?: string;
  user_picture?: File;
}

export function getCurrentUser(id: number | string): IAxiosAction {
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

  return {
    type: USER_REQUEST_UPDATE,
    config: {
      method: 'patch',
      url: `/user/${id}`,
      data: payload,
    },
  };
}

export function userLogout(): IAxiosAction {
  return {
    type: USER_REQUEST_LOGOUT,
    config: {
      method: 'POST',
      url: `/oauth/logout`,
    },
  };
}

export function userLostPassword(mail: string): IAxiosAction {
  return {
    type: USER_REQUEST_LOST_PASSWORD,
    config: {
      method: 'POST',
      url: `/user/lost-password`,
      data: { mail },
    },
  };
}

export function userLostPasswordReset(data: {
  name?: string | string[];
  temp_pass?: string | string[];
  new_pass?: string | string[];
}): IAxiosAction {
  return {
    type: USER_REQUEST_LOST_PASSWORD_RESET,
    config: {
      method: 'POST',
      url: `/user/lost-password-reset`,
      data,
    },
  };
}
