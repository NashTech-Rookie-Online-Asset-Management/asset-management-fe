import { useMutation } from '@tanstack/react-query';

import assetApi from './asset.service';
import type { Asset, UpdateAssetRequest } from './asset.types';

function useUpdateAsset() {
  return useMutation<Asset, AppAxiosError, UpdateAssetRequest>({
    mutationFn: (data: UpdateAssetRequest) => assetApi.updateAsset(data),
  });
}

export default useUpdateAsset;
