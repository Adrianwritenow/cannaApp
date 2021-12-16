import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
  providers: [
    FacebookProvider({
      // clientId: process.env.FACEBOOK_CLIENT_ID,
      // clientSecret: process.env.FACEBOOK_CLIENT_SECRET
      clientId: '598449914569505',
      clientSecret: '11ee62f34f9ed7406e7c20046dea8539',
    })
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Persist the OAuth access_token to the token right after signin
      session.accessToken = token.accessToken;
      return session;
    }
  }
});
