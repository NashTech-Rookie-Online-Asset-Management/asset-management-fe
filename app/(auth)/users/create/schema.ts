import { z } from 'zod';

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

export const createUserFormSchema = z
  .object({
    firstName: z
      .string()
      .min(3)
      .max(128)
      .refine((value) => /^[a-zA-Z\s]+$/.test(value), {
        message: 'Name can only contain letters and spaces',
      }),
    lastName: z
      .string()
      .min(3)
      .max(128)
      .refine((value) => /^[a-zA-Z\s]+$/.test(value), {
        message: 'Name can only contain letters and spaces',
      }),
    dob: z.string().refine((value) => new Date(value) < eighteenYearsAgo, {
      message: 'User is under 18. Please select a different date',
    }),
    gender: z.enum(['FEMALE', 'MALE'], {
      required_error: 'You need to select a gender',
    }),
    joinedAt: z
      .string()
      .refine(
        (value) =>
          new Date(value).getDay() !== 6 && new Date(value).getDay() !== 7,
        {
          message:
            'Joined date is Saturday or Sunday. Please select a different date',
        },
      ),
    type: z.enum(['ADMIN', 'STAFF'], {
      required_error: 'You need to select an account type',
    }),
    location: z.string().optional(),
  })
  .refine(
    (schema) =>
      new Date(schema.joinedAt).getFullYear() -
        new Date(schema.dob).getFullYear() >=
      18,
    {
      message:
        'Invalid joined date. It must be at least 18 years after the date of birth.',
    },
  );
