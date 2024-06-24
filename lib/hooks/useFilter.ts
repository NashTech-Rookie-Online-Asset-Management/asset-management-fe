import { useMemo, useState } from 'react';

import useDebounce from './useDebounce';

export default function useFilter<T>(
  data: T[] | undefined,
  filterFn: (item: T, filterValue: string) => boolean,
  delay: number = 300,
) {
  const [filter, setFilter] = useState('');
  const debouncedFilter = useDebounce(filter, delay);

  const filterData = useMemo(() => {
    if (!data) return [];
    if (!debouncedFilter) return data;

    return data.filter((item) => filterFn(item, debouncedFilter));
  }, [data, debouncedFilter]);

  return { filter, setFilter, filterData };
}
