import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    userId?: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    error?: string;
    accessToken?: string;
    accessTokenExpires?: number;
    refreshToken?: string;
    expiresIn?: number;
    userId?: number;
  }
}
