import BaseApiService from '@/lib/services/baseApi.service';

import type { Category, CreateCategoryRequest } from './category.types';

class CategoryApiService extends BaseApiService {
  constructor() {
    super('category');
  }

  getCategories() {
    return this.httpClient.get<Category[]>('/');
  }

  createCategory(data: CreateCategoryRequest) {
    return this.httpClient.post<Category>('/', data);
  }
}

const categoryApi = new CategoryApiService();

export default categoryApi;
