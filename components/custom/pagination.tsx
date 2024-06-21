// eslint-disable-next-line simple-import-sort/imports
import { useEffect, useState } from 'react';

import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as UIPagination,
} from '@/components/ui/pagination';
import { Input } from '../ui/input';

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

  const [paginationRange, setPaginationRange] = useState<number[]>([]);

  useEffect(() => {
    const calculatePaginationRange = () => {
      const halfMaxPages = Math.floor(maxPages / 2);
      const startPage = Math.max(1, currentPage - halfMaxPages);
      const endPage = Math.min(totalPages, startPage + maxPages - 1);

      const range = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i,
      );

      if (currentPage === totalPages && totalPages >= maxPages) {
        range.unshift(currentPage - 2);
      }

      setPaginationRange(range);
    };

    calculatePaginationRange();
  }, [currentPage, maxPages, totalPages]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <UIPagination className="flex justify-end gap-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : 0}
            className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
            onClick={() => {
              handlePageChange(currentPage - 1);
            }}
          >
            Previous
          </PaginationPrevious>
        </PaginationItem>

        {currentPage === maxPages && totalPages > maxPages && (
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                handlePageChange(1);
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {paginationRange[0] > maxPages - 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  handlePageChange(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {paginationRange.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              onClick={() => {
                handlePageChange(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage === totalPages - maxPages + 1 && totalPages > maxPages && (
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                handlePageChange(totalPages);
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {paginationRange[paginationRange.length - 1] < totalPages - 1 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  handlePageChange(totalPages);
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            aria-disabled={currentPage >= totalPages}
            tabIndex={currentPage >= totalPages ? -1 : 0}
            className={
              currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''
            }
            onClick={() => {
              handlePageChange(currentPage + 1);
            }}
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>

      <Input
        type="number"
        placeholder="Go to"
        className="w-20"
        min={1}
        max={totalPages}
        onChange={(e) => {
          const value = Number(e.target.value);
          let page = value;
          if (value < 1) {
            page = 1;
          } else if (value > totalPages) {
            page = totalPages;
          }

          if (page) {
            e.target.value = String(page);
            handlePageChange(page);
          }
        }}
      />
    </UIPagination>
  );
};

export default Pagination;
