import type { ApiMessage, Order } from '@/lib/@types/api';
import BaseApiService from '@/lib/services/baseApi.service';

import type {
  ReturningRequest,
  ReturningRequestSortField,
} from './returning-request.type';

class ReturningRequestApiService extends BaseApiService {
  constructor() {
    super('returning-requests');
  }

  getReturningRequests({
    page,
    take,
    search,
    states,
    returnedDate,
    sortField,
    sortOrder,
  }: {
    page: number;
    take: number;
    search: string;
    states: string[];
    returnedDate?: string;
    sortField: ReturningRequestSortField;
    sortOrder: Order;
  }) {
    return this.httpClient.get<GetList<ReturningRequest>>('/', {
      params: {
        page,
        take,
        search: search || undefined,
        states: states.join(',') || undefined,
        returnedDate: returnedDate || undefined,
        sortField,
        sortOrder,
      },
    });
  }

  toggleReturningRequest(id: number, state: boolean) {
    return this.httpClient.patch<ApiMessage>(`/${id}`, {
      state,
    });
  }
}

const returningRequestApi = new ReturningRequestApiService();

export default returningRequestApi;
