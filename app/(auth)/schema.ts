import { z } from 'zod';

export const changePasswordFirstTimeSchema = z.object({
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .refine(
      (value) => /[A-Z]/.test(value ?? ''),
      'Password must contain at least one uppercase letter',
    )
    .refine(
      (value) => /[a-z]/.test(value ?? ''),
      'Password must contain at least one lowercase letter',
    )
    .refine(
      (value) => /\d/.test(value ?? ''),
      'Password must contain at least one number',
    )
    .refine(
      (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value ?? ''),
      'Password must contain at least one special character',
    ),
});
