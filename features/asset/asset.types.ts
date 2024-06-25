import type { AssetState, Location } from '@/lib/@types/api';

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
  assignments: {
    id: number;
    assignedDate: string;
    assignedTo: {
      id: number;
      username: string;
    };
    assignedBy: {
      id: number;
      username: string;
    };
    returningRequest: {
      id: number;
      returnedDate: string;
    };
  }[];
};

export type AssetSortField =
  | 'assetCode'
  | 'name'
  | 'category'
  | 'state'
  | 'updatedAt';

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
