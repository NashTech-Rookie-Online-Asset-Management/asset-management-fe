import { useQuery } from '@tanstack/react-query';

import categoryApi from './category.service';

function useGetCategories() {
  return useQuery({
    queryKey: [`categories`],
    queryFn: () => categoryApi.getCategories(),
  });
}

export default useGetCategories;
