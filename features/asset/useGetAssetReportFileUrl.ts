import { useMutation } from '@tanstack/react-query';

import assetApi from './asset.service';

function useGetAssetReportFileUrl() {
  return useMutation<string, AppAxiosError>({
    mutationFn: () => assetApi.getAssetReportFileUrl(),
  });
}

export default useGetAssetReportFileUrl;
