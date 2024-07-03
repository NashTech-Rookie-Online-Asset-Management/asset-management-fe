import type { ApiMessage, Order } from '@/lib/@types/api';
import BaseApiService from '@/lib/services/baseApi.service';

import type {
  Asset,
  AssetReportSortField,
  AssetSortField,
  CreateAssetRequest,
  ReportItem,
  UpdateAssetRequest,
} from './asset.types';

class AssetApiService extends BaseApiService {
  constructor() {
    super('assets');
  }

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
    return this.httpClient.get<GetList<Asset>>('/', {
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
    return this.httpClient.get<Asset>(`/${assetId}`);
  }

  createAsset(data: CreateAssetRequest) {
    return this.httpClient.post<Asset>('/', data);
  }

  deleteAsset(assetId: number) {
    return this.httpClient.delete(`/${assetId}`) as Promise<ApiMessage>;
  }

  updateAsset(data: UpdateAssetRequest) {
    return this.httpClient.patch<Asset>(`/${data.id}`, data);
  }

  getAssetReport({
    page,
    take,
    search,
    sortField,
    sortOrder,
  }: {
    page: number;
    take: number;
    search: string;
    sortField: AssetReportSortField;
    sortOrder: Order;
  }) {
    return this.httpClient.get<GetList<ReportItem>>('/report', {
      params: {
        page,
        take,
        search: search || undefined,
        sortField,
        sortOrder,
      },
    });
  }

  async getAssetReportFileUrl(): Promise<string> {
    const response = await this.httpClient.get<any>(
      '/report/export?format=xlsx',
      {
        responseType: 'blob',
      },
    );
    const blob = new Blob([response]);
    const url = window.URL.createObjectURL(blob);
    return url;
  }
}

const assetApi = new AssetApiService();

export default assetApi;
