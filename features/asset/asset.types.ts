import type { AssetState, Location } from '@/lib/@types/api';

import type { Category } from '../category/category.types';

export type Asset = {
  id: number;
  assetCode: string;
  name: string;
  state: AssetState;
  category: Omit<Category, 'prefix'>;
  installedDate: string;
  location: Location;
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

export type AssetSortField = 'assetCode' | 'name' | 'category' | 'state';
