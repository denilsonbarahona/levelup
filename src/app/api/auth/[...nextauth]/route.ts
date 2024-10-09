import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import jwt from "jsonwebtoken";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
      authorization: { params: { scope: "repo read:user user:email" } },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      const signedToken = jwt.sign(
        { ...session },
        process.env.NEXT_PUBLIC_JWT_SECRET,
      );
      return { signedToken, ...session };
    },
  },
});

export { handler as GET, handler as POST };
