import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

// Don't add NODE_ENV into T3 env, it changes the tree-shaking behavior
export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  },
  // You need to destructure all the keys manually
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});
