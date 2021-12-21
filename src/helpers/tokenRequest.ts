import axios from 'axios';
import { JWT } from 'next-auth/jwt';
import sureThing from '@/helpers/sureThing';
import { ITokenRequest, ITokenResponse } from '@/interfaces/token';

export default async function tokenRequest(
  token: {},
  url: string,
  params: ITokenRequest
): JWT {
  const response = await sureThing(
    axios.post(url, new URLSearchParams(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  );

  if (!response.ok) {
    return {
      ...token,
      error: params.errorType ?? 'AccessTokenError',
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
    error: null,
  };
}
