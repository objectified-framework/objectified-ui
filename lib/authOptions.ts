import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import {LoginDto} from "@objectified-framework/objectified-services/dist/generated/dto";
import {AuthLogin} from "@objectified-framework/objectified-services/src/generated/clients";
import axios from 'axios';

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
    async signIn({ user, account: any, profile, email, credentials }) {
      if (account.provider === 'github') {
        // Github login path
        const loginDto: LoginDto = {
          emailAddress: <string>user['email'],
          source: ['github'],
        };

        await axios.post('/auth');

        console.log('Login path.', loginDto);

        return false;
      }

      console.log(`signIn: user=${JSON.stringify(user, null, 2)} account=${JSON.stringify(account, null, 2)} profile=${JSON.stringify(profile, null, 2)} email=${JSON.stringify(email)} credentials=${JSON.stringify(credentials, null, 2)}`);
      return false;
    },
    async redirect({ url, baseUrl }) {
      console.log(`redirect: url=${JSON.stringify(url)} baseUrl=${JSON.stringify(baseUrl)}`);
      return baseUrl;
    },
    async session({ session, token, user }) {
      console.log(`session: session=${JSON.stringify(session, null, 2)} user=${JSON.stringify(user, null, 2)} token=${JSON.stringify(token, null, 2)}`);
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log(`jwt: token=${JSON.stringify(token)} user=${JSON.stringify(user)} account=${JSON.stringify(account)} profile=${JSON.stringify(profile)} isNewUser=${JSON.stringify(isNewUser)}`);
      return token;
    }
  }
};

