import axios from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import NextAuth from 'next-auth';
import qs from 'qs';
import sureThing from '@/helpers/sureThing';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const axiosLogin = axios.create({
          baseURL: process.env.API_URL,
        });

        // Get access token.
        const tokenResponse = await sureThing(
          axiosLogin.post(
            `/oauth/token`,
            qs.stringify({
              username: credentials.email,
              password: credentials.password,
              grant_type: 'password',
              client_id: process.env.CLIENT_ID,
              client_secret: process.env.CLIENT_SECRET,
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                accept: 'application/json',
              },
            }
          )
        );

        if (!tokenResponse.ok) {
          return null;
        }

        const tokenData = tokenResponse.result.data;
        const decoded = jwtDecode<JwtPayload>(tokenData.access_token);

        return {
          uid: decoded.sub,
          tokenData,
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      debug: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.provider = `social_auth_${account.provider}`;
        if (account.access_token) {
          token.accessToken = account.access_token;
        }
        if (account.tokenData) {
          token.accessToken = account.tokenData.access_token;
          token.refreshToken = account.tokenData.refresh_token;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.provider = token.provider;
      return session;
    },
  },
});
