import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { PaginationApiProps } from '@/lib/@types/api';

import assetApi from './asset.service';
import type { Asset, AssetSortField } from './asset.types';

export type GetAssetsProps = PaginationApiProps<AssetSortField> & {
  states: string[];
  categoryIds: string[];
};

function useGetAssets(
  props: GetAssetsProps,
  queryKey?: string,
  topAsset?: Asset,
) {
  return useQuery({
    queryKey: [`assets`, queryKey ?? JSON.stringify(props)],
    queryFn: async () => {
      let assets = await assetApi.getAssets(props);
      if (topAsset) {
        assets = {
          ...assets,
          data: [topAsset, ...assets.data.filter((a) => a.id !== topAsset.id)],
        };
      }
      return assets;
    },
    placeholderData: keepPreviousData,
  });
}

export default useGetAssets;
