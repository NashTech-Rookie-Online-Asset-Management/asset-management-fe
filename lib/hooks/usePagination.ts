import type { ParserBuilder } from 'nuqs';
import {
  createSerializer,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  parseAsStringLiteral,
  useQueryState,
} from 'nuqs';
import { useDebounceCallback } from 'usehooks-ts';

import { Order } from '../@types/api';

export type PaginationProps<T> = {
  sortFields: readonly T[];
  defaultSortField: T;
  defaultSortOrder?: Order;
  additionalParamsParsers?: Record<string, ParserBuilder<any>>;
};

export default function usePagination<T extends string>({
  sortFields,
  defaultSortField,
  defaultSortOrder = Order.ASC,
  additionalParamsParsers = {},
}: PaginationProps<T>) {
  const [page, setPage] = useQueryState<number>(
    'page',
    parseAsInteger.withDefault(1),
  );
  const [searchValue, setSearchValue] = useQueryState<string>(
    'search',
    parseAsString.withDefault(''),
  );
  const debouncedSetSearchValue = useDebounceCallback(setSearchValue, 700);

  const [sortField, setSortField] = useQueryState(
    'sortField',
    parseAsStringLiteral(sortFields).withDefault(defaultSortField),
  );
  const [sortOrder, setSortOrder] = useQueryState<Order>(
    'sortOrder',
    parseAsStringEnum<Order>(Object.values(Order)).withDefault(
      defaultSortOrder,
    ),
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (value: string) => {
    debouncedSetSearchValue(value);
    setPage(1);
  };

  const handleSortColumn = (column: T) => {
    if (sortField === column) {
      setSortOrder((prevOrder) =>
        prevOrder === Order.ASC ? Order.DESC : Order.ASC,
      );
    } else {
      setSortField(column);
      setSortOrder(Order.ASC);
    }
  };

  const paginationParams = {
    page: parseAsInteger,
    search: parseAsString,
    sortField: parseAsStringLiteral(sortFields),
    sortOrder: parseAsStringEnum<Order>(Object.values(Order)),
    ...additionalParamsParsers,
  };

  const serialize = createSerializer(paginationParams);

  return {
    metadata: {
      page,
      searchValue,
      sortField,
      sortOrder,
    },
    handlers: {
      handlePageChange,
      handleSearch,
      handleSortColumn,
      serialize,
    },
    params: paginationParams,
  };
}
