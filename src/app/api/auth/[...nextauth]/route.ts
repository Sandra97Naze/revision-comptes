import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        // À adapter selon votre système d'authentification
        if (credentials?.username === "test@test.com" && credentials?.password === "test") {
          return {
            id: "1",
            email: credentials.username,
            role: "reviseur"
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login'
  }
});

export { handler as GET, handler as POST };
