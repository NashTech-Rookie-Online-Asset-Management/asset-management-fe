import { useMutation } from '@tanstack/react-query';

import categoryApi from './category.service';
import type { Category, CreateCategoryRequest } from './category.types';

function useCreateCategory() {
  return useMutation<Category, AppAxiosError, CreateCategoryRequest>({
    mutationFn: (data: CreateCategoryRequest) =>
      categoryApi.createCategory(data),
  });
}

export default useCreateCategory;
