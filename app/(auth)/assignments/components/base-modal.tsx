import { useRef, useState } from 'react';

import { Label } from '@/components/ui/label';
import { TableCell as CoreTableCell } from '@/components/ui/table';
import type { PaginationApiProps } from '@/lib/@types/api';
import { Order } from '@/lib/@types/api';
import useDebounce from '@/lib/hooks/useDebounce';

export interface ModalProps<T> {
  open: boolean;
  defaultValue?: string;
  setOpen: (open: boolean) => void;
  onSelect: (selectValue: T) => void;
}

interface TabaleCellProps {
  htmlFor: string;
}
export function TableCell(props: React.PropsWithChildren<TabaleCellProps>) {
  return (
    <CoreTableCell className="p-0">
      <Label
        htmlFor={props.htmlFor}
        className="inline-flex w-full cursor-pointer p-4 font-normal"
      >
        {props.children}
      </Label>
    </CoreTableCell>
  );
}

export const ITEM_PER_PAGE = 10;

export function usePaginate(
  take: number = ITEM_PER_PAGE,
  debounce: number = 300,
  defaultSortKey: string = '',
) {
  const [pagination, setPagination] = useState<PaginationApiProps>({
    search: '',
    page: 1,
    take,
    sortOrder: Order.ASC,
    sortField: defaultSortKey,
  });

  const previousSearch = useRef('');

  const debounceSearch = useDebounce(pagination.search, debounce, () => {
    if (pagination.search && previousSearch.current !== pagination.search) {
      setPagination((pag) => ({ ...pag, page: 1 }));
      previousSearch.current = pagination.search;
    }
  });

  const handleChangePagination = (key: keyof PaginationApiProps, value: any) =>
    setPagination((pag) => ({ ...pag, [key]: value }));

  return {
    setPagination: handleChangePagination,
    pagination: {
      take: pagination.take,
      page: pagination.page,
      search: debounceSearch,
      sortField: pagination.sortField,
      sortOrder: pagination.sortOrder,
    },
  };
}
