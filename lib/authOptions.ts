import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(`signIn: user=${JSON.stringify(user)} account=${JSON.stringify(account)} profile=${JSON.stringify(profile)} email=${JSON.stringify(email)} credentials=${JSON.stringify(credentials)}`);
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log(`redirect: url=${JSON.stringify(url)} baseUrl=${JSON.stringify(baseUrl)}`);
      return baseUrl;
    },
    async session({ session, user, token }) {
      console.log(`session: session=${JSON.stringify(session)} user=${JSON.stringify(user)} token=${JSON.stringify(token)}`);
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log(`jwt: token=${JSON.stringify(token)} user=${JSON.stringify(user)} account=${JSON.stringify(account)} profile=${JSON.stringify(profile)} isNewUser=${JSON.stringify(isNewUser)}`);
      return token;
    }
  }
};

