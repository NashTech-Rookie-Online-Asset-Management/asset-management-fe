import HttpService from '@/lib/services/http.service';

import type { Category } from './category.types';

class CategoryApiService extends HttpService {
  getCategories() {
    return this.get<Category[]>('category');
  }
}

const categoryApi = new CategoryApiService();

export default categoryApi;
