import { useMutation } from '@tanstack/react-query';

import assetApi from './asset.service';
import type { Asset, CreateAssetRequest } from './asset.types';

function useCreateAsset() {
  return useMutation<Asset, AppAxiosError, CreateAssetRequest>({
    mutationFn: (data: CreateAssetRequest) => assetApi.createAsset(data),
  });
}

export default useCreateAsset;
