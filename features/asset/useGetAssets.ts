import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { Order } from '@/lib/@types/api';

import assetApi from './asset.service';
import type { AssetSortField } from './asset.types';

function useGetAssets({
  page,
  take,
  search,
  states,
  categoryIds,
  sortField,
  sortOrder,
}: {
  page: number;
  take: number;
  search: string;
  states: string[];
  categoryIds: string[];
  sortField: AssetSortField;
  sortOrder: Order;
}) {
  return useQuery({
    queryKey: [`assets`],
    queryFn: () =>
      assetApi.getAssets({
        page,
        take,
        search,
        states,
        categoryIds,
        sortField,
        sortOrder,
      }),
    placeholderData: keepPreviousData,
  });
}

export default useGetAssets;
