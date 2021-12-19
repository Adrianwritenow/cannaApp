import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import axios from 'axios';
import qs from 'qs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const axiosLogin = axios.create({
          // baseURL: process.env.API_URL,
          baseURL: 'http://localhost:8080',
        });

        const response = await axiosLogin.post(
          `/oauth/token`,
          qs.stringify({
            username: credentials.email,
            password: credentials.password,
            grant_type: 'password',
            // client_id: process.env.CLIENT_ID,
            client_id: 'ec881dc6-d3c8-4475-abe1-fd9605f6cfba',
            client_secret: 'secret',
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              accept: 'application/json',
            },
          }
        );

        return response;

        return {
          id: 1,
          name: 'J Smith',
          email: 'jsmith@example.com',
          token: 'tests',
        };
      },
    }),
    FacebookProvider({
      // clientId: process.env.FACEBOOK_CLIENT_ID,
      // clientSecret: process.env.FACEBOOK_CLIENT_SECRET
      clientId: '598449914569505',
      clientSecret: '11ee62f34f9ed7406e7c20046dea8539',
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
