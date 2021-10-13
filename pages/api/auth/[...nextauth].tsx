import { NextApiRequest, NextApiResponse } from "next-auth/internals/utils";

import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { login } from "../../../src/actions/login";

// Configure one or more authentication providers
const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),

    Providers.Credentials({
      name: "Credentials",
      async authorize(credentials, req) {
        const user = await login(credentials.email, credentials.password);
        const userProfile = await login(
          credentials.email,
          credentials.password
        );

        console.log("user:", user);

        if (user) {
          //   window.localStorage.setItem("access_token", user.csrf_token);
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  session: {
    jwt: true,
    // maxAge: 30 * 24 * 60 * 60,  30 days
  },

  callbacks: {
    jwt: async (
      token: { jwt: any; user: any },
      user: { csrf_token: any; current_user: any }
    ) => {
      if (user) {
        token.jwt = user.csrf_token;
        token.user = user.current_user;
      }
      return Promise.resolve(token);
    },
    session: async (
      session: { jwt: any; user: any },
      token: { jwt: any; user: any }
    ) => {
      session.jwt = token.jwt;
      session.user = token.user;
      return Promise.resolve(session);
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse<any>) =>
  NextAuth(req, res, options);
