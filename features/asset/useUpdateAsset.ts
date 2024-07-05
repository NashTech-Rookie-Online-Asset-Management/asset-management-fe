import { useMutation, useQueryClient } from '@tanstack/react-query';

import assetApi from './asset.service';
import type { Asset, UpdateAssetRequest } from './asset.types';

function useUpdateAsset() {
  const queryClient = useQueryClient();
  return useMutation<Asset, AppAxiosError, UpdateAssetRequest>({
    mutationFn: (data: UpdateAssetRequest) => assetApi.updateAsset(data),
    onSuccess(data) {
      queryClient.setQueryData(['assets', data.id, { pinned: true }], data);
      queryClient.invalidateQueries({
        queryKey: ['assets', data.id],
        exact: true,
      });
    },
  });
}

export default useUpdateAsset;
