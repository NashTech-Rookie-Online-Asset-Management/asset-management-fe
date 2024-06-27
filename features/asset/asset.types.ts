import type { AssetState, Location } from '@/lib/@types/api';

import type { Assignment } from '../assignment/assignment.types';
import type { Category } from '../category/category.types';

export type Asset = {
  id: number;
  assetCode: string;
  name: string;
  state: keyof typeof AssetState;
  category: Omit<Category, 'prefix'>;
  installedDate: string;
  location: keyof typeof Location;
  specification: string;
  // TODO: Change to Assignment type
  assignments: Assignment[];
};

export const assetSortFields = [
  'assetCode',
  'name',
  'category',
  'state',
  'updatedAt',
] as const;

export type AssetSortField = (typeof assetSortFields)[number];

export type CreateAssetRequest = {
  name: string;
  categoryId: number;
  specification?: string;
  installedDate: Date;
  state: keyof typeof AssetState;
};

export type UpdateAssetRequest = Partial<
  Omit<CreateAssetRequest, 'categoryId'>
> & { id: number };
