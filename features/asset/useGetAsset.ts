import { keepPreviousData, useQuery } from '@tanstack/react-query';

import assetApi from './asset.service';

function useGetAsset({ assetId }: { assetId: number }) {
  return useQuery({
    queryKey: ['asset', assetId],
    queryFn: () =>
      assetApi.getAsset({
        assetId,
      }),
    placeholderData: keepPreviousData,
  });
}

export default useGetAsset;
