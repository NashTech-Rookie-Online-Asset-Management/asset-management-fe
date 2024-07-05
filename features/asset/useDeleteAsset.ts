import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ApiMessage } from '@/lib/@types/api';

import assetApi from './asset.service';

function useDeleteAsset(id: number) {
  const queryClient = useQueryClient();
  return useMutation<ApiMessage, AppAxiosError>({
    mutationFn: () => assetApi.deleteAsset(id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['assets', id] });
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });
}

export default useDeleteAsset;
