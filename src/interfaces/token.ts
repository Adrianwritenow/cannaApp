export interface ITokenRequest {
  client_id: string;
  client_secret: string;
  grant_type: string;
  scope?: string;
  username?: string;
  password?: string;
  refresh_token?: string;
  errorType?: string;
}

export interface ITokenResponse {
  accessToken: string;
  accessTokenExpires: number;
  refreshToken: string;
  expiresIn: number;
  error?: string;
}
