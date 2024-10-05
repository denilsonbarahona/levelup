// /app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import jwt from "jsonwebtoken";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
      authorization: { params: { scope: "repo read:user" } }, // Pedimos los permisos para obtener repos
    }),
  ],
  session: {
    strategy: "jwt", // Usamos JWT para la sesión
  },
  jwt: {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET, // Secreto para firmar el token
  },
  callbacks: {
    async jwt({ token, account, user }) {
      console.log(token, account, user, "token");
      if (account) {
        token.accessToken = account.access_token; // Guardar el access_token
        token.id = user.id; // También puedes guardar el ID del usuario si lo necesitas
      }

      return token; // Retornamos el token para que sea firmado
    },
    async session({ session, token }: any) {
      // session.accessToken = token.accessToken; // Pasamos el access_token a la sesión
      session.user.id = token.id; // Pasamos el ID del usuario si lo necesitas
      const signedToken = jwt.sign(
        { ...session }, // Incluimos todo el objeto token, que ya tiene `exp`, `iat`, y más
        process.env.NEXT_PUBLIC_JWT_SECRET, // Usamos el secreto para firmar
      );
      return { signedToken, ...session };
    },
  },
});

export { handler as GET, handler as POST };
