import type { ApiMessage, Order } from '@/lib/@types/api';
import HttpService from '@/lib/services/http.service';

import type {
  Asset,
  AssetSortField,
  CreateAssetRequest,
  UpdateAssetRequest,
} from './asset.types';

class AssetApiService extends HttpService {
  getAssets({
    page,
    take,
    search,
    states,
    categoryIds,
    sortField,
    sortOrder,
  }: {
    page: number;
    take: number;
    search: string;
    states: string[];
    categoryIds: string[];
    sortField: AssetSortField;
    sortOrder: Order;
  }) {
    return this.get<GetList<Asset>>('assets', {
      params: {
        page,
        take,
        search: search || undefined,
        states: states.join(',') || undefined,
        categoryIds: categoryIds.join(',') || undefined,
        sortField,
        sortOrder,
      },
    });
  }

  getAsset(assetId: number) {
    return this.get<Asset>(`assets/${assetId}`);
  }

  createAsset(data: CreateAssetRequest) {
    return this.post<Asset>('assets', data);
  }

  deleteAsset(assetId: number) {
    return this.delete(`assets/${assetId}`) as Promise<ApiMessage>;
  }

  updateAsset(data: UpdateAssetRequest) {
    return this.patch<Asset>(`assets/${data.id}`, data);
  }
}

const assetApi = new AssetApiService();

export default assetApi;
