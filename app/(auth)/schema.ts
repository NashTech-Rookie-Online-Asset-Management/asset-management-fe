import { z } from 'zod';

export const changePasswordFirstTimeSchema = z.object({
  newPassword: z
    .string()
    .refine(
      (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value ?? '',
        ),
      'Your password must be at least 8 characters long with one uppercase letter, one lowercase letter, one number, and one special character.',
    ),
});
