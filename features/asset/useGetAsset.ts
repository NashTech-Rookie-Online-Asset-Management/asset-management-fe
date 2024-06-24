import { keepPreviousData, useQuery } from '@tanstack/react-query';

import assetApi from './asset.service';

function useGetAsset(assetId: number) {
  return useQuery({
    queryKey: ['assets', assetId],
    queryFn: () => assetApi.getAsset(assetId),
    placeholderData: keepPreviousData,
  });
}

export default useGetAsset;
