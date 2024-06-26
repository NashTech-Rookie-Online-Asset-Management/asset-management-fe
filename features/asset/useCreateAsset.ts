import { useMutation, useQueryClient } from '@tanstack/react-query';

import assetApi from './asset.service';
import type { Asset, CreateAssetRequest } from './asset.types';

function useCreateAsset() {
  const queryClient = useQueryClient();
  return useMutation<Asset, AppAxiosError, CreateAssetRequest>({
    mutationFn: (data: CreateAssetRequest) => assetApi.createAsset(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['assets', data.id, { pinned: true }], data);
    },
  });
}

export default useCreateAsset;
