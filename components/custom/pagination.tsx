'use client';

import { useCallback, useState } from 'react';
import ReactPagination from 'react-paginate';
import { useMediaQuery } from 'usehooks-ts';

import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

import { Input } from '../ui/input';

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  className,
}: {
  totalPages: number;
  currentPage: number;
  className?: string;
  onPageChange: (page: number) => void;
}) => {
  const [inputValue, setInputValue] = useState(currentPage.toString());
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const maxPages = isDesktop ? 3 : 0;

  const handlePageChange = useCallback(
    (page: number) => {
      if (page !== currentPage && page > 0 && page <= totalPages) {
        onPageChange(page);
        setInputValue(page.toString());
      }
    },
    [currentPage, onPageChange, totalPages],
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <UIPagination
      className={cn(
        'flex flex-row-reverse md:flex-row justify-between md:justify-end gap-2 md:gap-8',
        className,
      )}
    >
      <PaginationContent>
        <ReactPagination
          pageCount={totalPages}
          pageRangeDisplayed={maxPages}
          marginPagesDisplayed={1}
          initialPage={currentPage - 1}
          onPageChange={(data) => {
            handlePageChange(data.selected + 1);
          }}
          forcePage={currentPage - 1}
          disableInitialCallback
          containerClassName="flex items-center gap-2"
          pageClassName="hidden md:block"
          pageLinkClassName="inline-flex size-9 md:size-10 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground"
          activeClassName="hidden md:block"
          activeLinkClassName="inline-flex size-9 md:size-10 items-center justify-center whitespace-nowrap rounded-md border border-gray-300 text-sm font-medium ring-offset-background transition-colors"
          previousLabel={
            <PaginationPrevious
              aria-disabled={currentPage <= 1}
              tabIndex={currentPage <= 1 ? -1 : 0}
              className={
                currentPage <= 1
                  ? 'cursor-default opacity-50 hover:bg-transparent'
                  : ''
              }
              size={isDesktop ? 'default' : 'sm'}
            >
              Previous
            </PaginationPrevious>
          }
          nextLabel={
            <PaginationNext
              aria-disabled={currentPage >= totalPages}
              tabIndex={currentPage >= totalPages ? -1 : 0}
              className={
                currentPage >= totalPages
                  ? 'cursor-default opacity-50 hover:bg-transparent'
                  : ''
              }
              size={isDesktop ? 'default' : 'sm'}
            >
              Next
            </PaginationNext>
          }
          breakClassName="hidden md:block"
          breakLabel={<PaginationEllipsis />}
        />
      </PaginationContent>

      <Input
        type="number"
        placeholder="Go to"
        className="h-9 w-20 md:h-10"
        value={inputValue}
        min={1}
        max={totalPages}
        onChange={(e) => {
          let value = Number(e.target.value);
          if (value) {
            value = Math.min(Math.max(value, 1), totalPages);
            e.target.value = value.toString();
            handlePageChange(value);
          } else {
            e.target.value = '';
          }
          setInputValue(e.target.value);
        }}
      />
    </UIPagination>
  );
};

export default Pagination;
