'use client';

// eslint-disable-next-line simple-import-sort/imports
// eslint-disable-next-line import/no-extraneous-dependencies

import { ArrowDownAZ, ArrowUpAZ, Search } from 'lucide-react';

import { CustomCell } from '@/components/custom/custom-cell';
import { LoadingButton } from '@/components/custom/loading-button';
import Pagination from '@/components/custom/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type {
  AssetReportSortField,
  ReportItem,
} from '@/features/asset/asset.types';
import { assetReportSortFields } from '@/features/asset/asset.types';
import useGetAssetReport from '@/features/asset/useGetAssetReport';
import useGetAssetReportFileUrl from '@/features/asset/useGetAssetReportFileUrl';
import { Order } from '@/lib/@types/api';
import { PAGE_SIZE } from '@/lib/constants/pagination';
import usePagination from '@/lib/hooks/usePagination';

const columns = [
  { label: 'Category', key: 'categoryName' },
  { label: 'Total', key: 'total' },
  { label: 'Assigned', key: 'assigned' },
  { label: 'Available', key: 'available' },
  { label: 'Not available', key: 'notAvailable' },
  { label: 'Waiting for recycling', key: 'waitingForRecycling' },
  { label: 'Recycled', key: 'recycled' },
];

export default function AssetReport() {
  const pagination = usePagination({
    sortFields: assetReportSortFields,
    defaultSortField: 'categoryName',
  });
  const { page, searchValue, sortField, sortOrder } = pagination.metadata;
  const { handlePageChange, handleSearch, handleSortColumn, serialize } =
    pagination.handlers;

  const getAssetReportOptions = {
    page,
    take: PAGE_SIZE,
    search: searchValue,
    sortField,
    sortOrder,
  };

  const getAssetReportQueryKey = serialize({ ...getAssetReportOptions });

  const { data: assetReport } = useGetAssetReport(
    getAssetReportOptions,
    getAssetReportQueryKey,
  );

  const { mutateAsync: getAssetReportFileUrl, isPending } =
    useGetAssetReportFileUrl();

  const handleExportReport = async () => {
    const url = await getAssetReportFileUrl();
    const link = document.createElement('a');
    link.href = url;
    link.download = `OAM Report ${new Date().toLocaleDateString()}.xlsx`;
    link.click();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by category name"
              className="rounded-md border pr-10"
              onChange={(e) => handleSearch(e.target.value)}
              data-id="search-category-input"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-4 py-2"
              disabled
            >
              <Search className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
        <div className="lg:col-span-2" />
        <LoadingButton
          variant="default"
          className="lg:col-span-1"
          data-id="export-button"
          onClick={handleExportReport}
          disabled={isPending}
        >
          Export
        </LoadingButton>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      handleSortColumn(column.key as AssetReportSortField)
                    }
                  >
                    {column.label}
                    {sortField === column.key &&
                      (sortOrder === Order.ASC ? (
                        <ArrowDownAZ className="ml-2 inline size-4" />
                      ) : (
                        <ArrowUpAZ className="ml-2 inline size-4" />
                      ))}
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {assetReport && assetReport.data.length > 0 ? (
              assetReport.data.map((row: ReportItem) => (
                <TableRow key={row.categoryName}>
                  <CustomCell value={row.categoryName} />
                  <CustomCell value={row.total.toString()} />
                  <CustomCell value={row.assigned.toString()} />
                  <CustomCell value={row.available.toString()} />
                  <CustomCell value={row.notAvailable.toString()} />
                  <CustomCell value={row.waitingForRecycling.toString()} />
                  <CustomCell value={row.recycled.toString()} />
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-2 text-center text-gray-400"
                >
                  The report is empty.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination
        totalPages={assetReport?.pagination.totalPages || 0}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
