// This is a NextAuth.js configuration file for social login providers.
import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import LinkedInProvider from 'next-auth/providers/linkedin';
import TwitterProvider from 'next-auth/providers/twitter';
import RedditProvider from 'next-auth/providers/reddit';
import CredentialsProvider from 'next-auth/providers/credentials';

// Instagram: use generic OAuth provider (NextAuth does not have built-in Instagram)
const InstagramProvider = {
  id: 'instagram',
  name: 'Instagram',
  type: 'oauth',
  version: '2.0',
  authorization: 'https://api.instagram.com/oauth/authorize',
  token: 'https://api.instagram.com/oauth/access_token',
  userinfo: 'https://graph.instagram.com/me?fields=id,username',
  clientId: process.env.INSTAGRAM_CLIENT_ID,
  clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
  profile(profile) {
    return {
      id: profile.id,
      name: profile.username,
      email: null,
      image: null,
    };
  },
};

export default NextAuth({
  providers: [
    // Credentials provider allows email/password sign-in (POST)
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Attempt to call an external backend auth endpoint if provided,
        // otherwise fall back to a local API route `/api/credentials`.
        try {
          const backendUrl = process.env.BACKEND_URL
            ? `${process.env.BACKEND_URL.replace(/\/$/, '')}/auth/login`
            : `${process.env.NEXTAUTH_URL || ''}/api/credentials`;

          const res = await fetch(backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
          });
          const user = await res.json();
          if (res.ok && user) return user;
          return null;
        } catch (err) {
          return null;
        }
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: '2.0',
    }),
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
    }),
    InstagramProvider,
  ],
  // You can add callbacks, database, and session options here
});
