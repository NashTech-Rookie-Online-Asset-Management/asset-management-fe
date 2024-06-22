import { isAfter, isDate, isPast, isValid } from 'date-fns';
import { z } from 'zod';

import { AssetState } from '@/lib/@types/api';

export const createNewAssetSchema = z.object({
  name: z
    .string()
    .min(5, 'Asset name must be at least 5 characters long')
    .max(50, 'Asset name must be at most 50 characters long'),
  category: z.string({
    required_error: 'Please select a category.',
  }),
  specification: z
    .string()
    .min(5, 'Asset description must be at least 5 characters long')
    .max(100, 'Asset description must be at most 100 characters long'),
  installedDate: z
    .string()
    .refine((value) => !!value, 'Please select a date')
    .refine((value) => isPast(new Date(value)), 'Please select a past date')
    .refine(
      (value) =>
        isAfter(new Date(value), new Date(1970, 1, 1)) &&
        isDate(new Date(value)) &&
        !Number.isNaN(Date.parse(value)) &&
        isValid(new Date(value)),
      'Please select a valid date',
    ),
  state: z.enum([AssetState.AVAILABLE, AssetState.UNAVAILABLE]),
});

export const createNewCategorySchema = z.object({
  name: z.string().min(2),
  prefix: z.string().length(2).trim().toUpperCase(),
});
