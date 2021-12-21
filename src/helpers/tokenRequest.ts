import axios from 'axios';
import { JWT } from 'next-auth/jwt';
import sureThing from '@/helpers/sureThing';
import { ITokenRequest } from '@/interfaces/token';

export default async function tokenRequest(
  token: JWT,
  url: string,
  params: ITokenRequest
) {
  const response = await sureThing(
    axios.post(url, new URLSearchParams(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  );

  if (!response.ok) {
    return {
      accessToken: '',
      error: params.errorType ?? 'AccessTokenError',
      ...token,
    };
  }

  const tokenData = response.result.data || {};

  return {
    ...token,
    expiresIn: tokenData.expires_in,
    accessToken: tokenData.access_token,
    accessTokenExpires: Date.now() + tokenData.expires_in * 1000,
    // Fall back to old refresh token.
    refreshToken: tokenData.refresh_token ?? token.refreshToken,
  };
}
