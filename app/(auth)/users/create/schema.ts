import { z } from 'zod';

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

export const createUserFormSchema = z
  .object({
    firstName: z
      .string()
      .min(1)
      .max(128)
      .refine((value) => /^[a-zA-Z\s]+$/.test(value), {
        message: 'Name can only contain letters and spaces',
      }),
    lastName: z
      .string()
      .min(1)
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
          new Date(value).getDay() !== 0 && new Date(value).getDay() !== 6,
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
    (schema) => {
      return new Date(schema.joinedAt) > new Date(schema.dob);
    },
    {
      path: ['joinedAt'],
      message: 'Invalid joined date. It must be after the date of birth.',
    },
  )
  .refine(
    (schema) => {
      const timeDiff =
        new Date(schema.joinedAt).getTime() - new Date(schema.dob).getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      return daysDiff > 18 * 365;
    },
    {
      path: ['joinedAt'],
      message:
        'Invalid joined date. It must be at least 18 years after the date of birth.',
    },
  );
