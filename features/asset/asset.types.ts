import type { AssetState, Location } from '@/lib/@types/api';

import type { Assignment } from '../assignment/assignment.types';
import type { Category } from '../category/category.types';

export type Asset = {
  id: number;
  assetCode: string;
  name: string;
  state: AssetState;
  category: Category;
  installedDate: Date | string;
  updatedAt: Date | string;
  location: Location;
  specification: string;
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
> & { id: number; updatedAt?: Date | string };

export const assetReportSortFields = [
  'categoryName',
  'total',
  'assigned',
  'available',
  'notAvailable',
  'waitingForRecycling',
  'recycled',
] as const;

export type AssetReportSortField = (typeof assetReportSortFields)[number];

export type ReportItem = {
  categoryName: string;
  total: number;
  assigned: number;
  available: number;
  notAvailable: number;
  waitingForRecycling: number;
  recycled: number;
};
