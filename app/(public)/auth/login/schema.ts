import { z } from 'zod';

export const loginFormSchema = z.object({
  username: z.string().min(2).max(64),
  password: z.string().min(8),
});
