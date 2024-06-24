import { useMutation } from '@tanstack/react-query';

import type { ApiMessage } from '@/lib/@types/api';

import assetApi from './asset.service';

function useDeleteAsset() {
  return useMutation<ApiMessage, AppAxiosError, number>({
    mutationFn: (assetId: number) => assetApi.deleteAsset(assetId),
  });
}

export default useDeleteAsset;
