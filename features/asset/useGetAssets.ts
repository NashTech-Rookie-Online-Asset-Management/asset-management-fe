import { useQuery, useQueryClient } from '@tanstack/react-query';

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
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: [`assets`, queryKey ?? JSON.stringify(props)],
    queryFn: async () => {
      let assets = await assetApi.getAssets(props);
      if (topAsset) {
        const asset = queryClient.getQueryData<Asset>([
          'assets',
          topAsset.id,
          { pinned: true },
        ]);
        if (!asset) {
          return assets;
        }

        asset.pinned = true;

        queryClient.removeQueries({
          queryKey: ['assets', topAsset.id],
        });

        assets = {
          ...assets,
          data: [asset, ...assets.data.filter((a) => a.id !== topAsset.id)],
        };
      }
      return assets;
    },
  });
}

export default useGetAssets;
