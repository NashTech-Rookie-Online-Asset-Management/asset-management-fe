// eslint-disable-next-line simple-import-sort/imports
import { useCallback, useState } from 'react';

import {
  PaginationContent,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
  Pagination as UIPagination,
} from '@/components/ui/pagination';
import { Input } from '../ui/input';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactPagination from 'react-paginate';

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  const maxPages = 3;
  const [inputValue, setInputValue] = useState(currentPage.toString());

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
    <UIPagination className="flex justify-end gap-8">
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
          breakLinkClassName="null"
          containerClassName="flex items-center gap-2"
          pageLinkClassName="inline-flex size-10 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground"
          activeLinkClassName="inline-flex size-10 items-center justify-center whitespace-nowrap rounded-md border border-gray-300 text-sm font-medium ring-offset-background transition-colors"
          previousLabel={
            <PaginationPrevious
              aria-disabled={currentPage <= 1}
              tabIndex={currentPage <= 1 ? -1 : 0}
              className={
                currentPage <= 1
                  ? 'cursor-default opacity-50 hover:bg-white'
                  : ''
              }
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
                  ? 'cursor-default opacity-50 hover:bg-white'
                  : ''
              }
            >
              Next
            </PaginationNext>
          }
          breakLabel={<PaginationEllipsis />}
        />
      </PaginationContent>

      <Input
        type="number"
        placeholder="Go to"
        className="w-20"
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
