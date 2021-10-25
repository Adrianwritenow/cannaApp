import { NextApiRequest, NextApiResponse } from "next-auth/internals/utils";

import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { getCurrentUser } from "../../../src/actions/user";
import login from "../../../src/actions/login";

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
      authorize: async (credentials, req) => {
        try {
          const authorize = login(credentials.email, credentials.password);
          if (authorize) {
            return Promise.resolve(authorize);
          }
        } catch (error) {
          if (error) {
            Promise.reject(
              new Error("Invalid Username  and Password combination")
            );
          }
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
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  callbacks: {
    jwt: async (token: any, user: any) => {
      user && (token.user = user);
      return Promise.resolve(token);
    },

    session: async (
      session: { user: any; token: any },
      user: { user: { current_user: any } }
    ) => {
      session.token = user.user;
      const currentUser = await getCurrentUser(session.token);
      console.log("CU:::=>", session);
      return Promise.resolve(session);
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse<any>) =>
  NextAuth(req, res, options);
