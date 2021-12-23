import { JWT } from 'next-auth/jwt';

export type ITokenRequest = {
  client_id: string;
  client_secret: string;
  grant_type: string;
  scope?: string;
  username?: string;
  password?: string;
  refresh_token?: string;
  errorType?: string;
};
