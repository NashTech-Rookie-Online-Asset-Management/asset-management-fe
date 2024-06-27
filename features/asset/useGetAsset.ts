import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import assetApi from './asset.service';
import type { Asset } from './asset.types';

type GetAssetOptions = {
  pinned?: boolean;
  initialData?: Asset;
};

function useGetAsset(
  assetId: number,
  { pinned, initialData }: GetAssetOptions = {},
) {
  const queryClient = useQueryClient();
  const queryKey = pinned
    ? ['assets', assetId, { pinned }]
    : ['assets', assetId];
  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [, id] }) => {
      if (pinned) {
        return queryClient.getQueryData<Asset>(queryKey);
      }
      return assetApi.getAsset(id as number);
    },
    initialData: () => initialData || queryClient.getQueryData<Asset>(queryKey),
    placeholderData: keepPreviousData,
  });
}

export default useGetAsset;
