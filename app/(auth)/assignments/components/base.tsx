import { useRef, useState } from 'react';
import { z } from 'zod';

import { Label } from '@/components/ui/label';
import { TableCell as CoreTableCell } from '@/components/ui/table';
import type { PaginationApiProps } from '@/lib/@types/api';
import { AccountType, AssignmentState, Order } from '@/lib/@types/api';
import useDebounce from '@/lib/hooks/useDebounce';
import { cn } from '@/lib/utils';

interface TabaleCellProps {
  htmlFor: string;
  className?: string;
}
export function TableCell(props: React.PropsWithChildren<TabaleCellProps>) {
  return (
    <CoreTableCell className={cn('p-0', props.className)}>
      <Label
        htmlFor={props.htmlFor}
        className="inline-flex w-full cursor-pointer p-4 font-normal"
      >
        <p className="line-clamp-1">{props.children}</p>
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

export type TableCol = {
  key: string;
  name: string;
  sort?: boolean;
};

export const formSchema = z.object({
  assignedTo: z.object({
    staffCode: z.string(),
    fullName: z.string(),
    type: z.nativeEnum(AccountType),
  }),
  asset: z.object({
    assetCode: z.string(),
    name: z.string(),
    category: z.object({
      name: z.string().optional(),
    }),
  }),
  assignedDate: z.string().date(),
  note: z.string().max(256).optional(),
  state: z.nativeEnum(AssignmentState).optional(),
  id: z.number().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
export type AvailableAsset = FormSchema['asset'];

export interface ModalProps<T> {
  currentForm: FormSchema;
  assignment?: FormSchema;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSelect: (selectValue: T) => void;
  type: 'user' | 'asset';
}

export const onModalClose = (
  props: ModalProps<any>,
  newValue: string,
  onSet: () => void,
) => {
  if (
    props.type === 'user' &&
    props.currentForm.assignedTo.staffCode !== newValue
  ) {
    onSet();
  }

  if (
    props.type === 'asset' &&
    props.currentForm.asset.assetCode !== newValue
  ) {
    onSet();
  }

  props.setOpen(false);
};
