import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth/server';
import { cookies } from 'next/headers';
import config from '@/amplify_outputs.json';
import type { Schema } from '@/amplify/data/resource';

// Create a server runner for operations that need authenticated context
export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export const AuthGetCurrentUserServer = async () => {
  try {
    const cookieStore = cookies();
    const user = await runWithAmplifyServerContext({
      nextServerContext: { cookies: () => cookieStore },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });
    return user;
  } catch (error) {
    console.log('Not signed in', error);
    return undefined;
  }
};

// Create a server-side client that uses cookies
export const cookiesClient = generateServerClientUsingCookies<Schema>({
  config,
  cookies,
});