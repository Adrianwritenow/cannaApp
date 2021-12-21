import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import NextAuth from 'next-auth';
import tokenRequest from '@/helpers/tokenRequest';

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email Address',
          type: 'email',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Get access token.
        const token = await tokenRequest(
          {},
          `${process.env.API_URL}/oauth/token`,
          {
            username: credentials?.email || '',
            password: credentials?.password || '',
            grant_type: 'password',
            client_id: process.env.CLIENT_ID || '',
            client_secret: process.env.CLIENT_SECRET || '',
          }
        );

        if (token.error) {
          return null;
        }

        const decoded = jwtDecode<JwtPayload>(token?.accessToken || '');

        return {
          ...token,
          userId: decoded.sub,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial log in.
      if (account && user) {
        token.provider = `social_auth_${account.provider || ''}`;

        const expires_in: any = account.expires_in || 0;
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + expires_in * 1000,
          refreshToken: account.refresh_token,
          provider: `social_auth_${account.provider}`,
          ...user,
        };
      }

      // Return previous token if the access token has not expired yet.
      const accessTokenExpires: any = token.accessTokenExpires || 0;
      if (!accessTokenExpires || Date.now() < accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it for each provider type.
      switch (token.provider) {
        case 'social_auth_google':
          token = await tokenRequest(
            token,
            'https://oauth2.googleapis.com/token',
            {
              client_id: process.env.GOOGLE_CLIENT_ID || '',
              client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
              grant_type: 'refresh_token',
              refresh_token: token.refreshToken,
              errorType: 'RefreshTokenError',
            }
          );
          break;

        case 'social_auth_credentials':
          token = await tokenRequest(
            token,
            `${process.env.API_URL}/oauth/token`,
            {
              client_id: process.env.CLIENT_ID || '',
              client_secret: process.env.CLIENT_SECRET || '',
              grant_type: 'refresh_token',
              refresh_token: token.refreshToken,
              scope: 'regular_user',
              errorType: 'RefreshTokenError',
            }
          );
          break;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.provider = token.provider;
      session.error = token.error;

      if (token.userId) {
        session.userId = token.userId;
      }

      return session;
    },
  },
});
