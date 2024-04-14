import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { env } from './env';

declare module 'next-auth' {
  export interface Session {
    user: {
      username: string;
      name: string;
      email: string;
      image: string;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: env('AUTH_GITHUB_ID'),
      clientSecret: env('AUTH_GITHUB_SECRET'),
      profile: (profile) => {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, profile }) {
      if (user) token.user = user;
      if (profile) token.profile = profile;
      return token;
    },
    session({ session, token }) {
      if (session.user)
        session.user = {
          ...session.user,
          username: (token.profile as any).login,
        } as any;
      return session;
    },
  },
});
