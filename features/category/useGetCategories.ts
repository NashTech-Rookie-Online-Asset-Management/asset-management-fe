import { keepPreviousData, useQuery } from '@tanstack/react-query';

import categoryApi from './category.service';

function useGetCategories() {
  return useQuery({
    queryKey: [`categories`],
    queryFn: () => categoryApi.getCategories(),
    placeholderData: keepPreviousData,
  });
}

export default useGetCategories;
