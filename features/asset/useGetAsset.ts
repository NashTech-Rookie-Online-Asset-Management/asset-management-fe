import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import assetApi from './asset.service';
import type { Asset } from './asset.types';

function useGetAsset(assetId: number, pinned?: boolean) {
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
    placeholderData: keepPreviousData,
  });
}

export default useGetAsset;
