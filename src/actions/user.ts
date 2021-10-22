interface IAuthState {
  token_type?: string;
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
}

export function getCurrentUser(): IAuthState {
  return {
    type: USER_REQUEST_GET_CURRENT,
    pathParameters: {},
    config: {
      method: "GET",
      url: `${API_URL}/user/me`,
    },
  };
}
