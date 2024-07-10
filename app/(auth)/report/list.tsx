'use client';

import { ArrowDownAZ, ArrowUpAZ, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import { CustomCell } from '@/components/custom/custom-cell';
import { LoadingButton } from '@/components/custom/loading-button';
import Pagination from '@/components/custom/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  MobileCard,
  MobileCardContainer,
  MobileCardContent,
  MobileCardHeader,
} from '@/components/ui/mobile-card';
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
import { useIsDesktop } from '@/lib/hooks/useIsDesktop';
import usePagination from '@/lib/hooks/usePagination';

const columns = [
  { label: 'Category', key: 'categoryName', width: '20%' },
  { label: 'Total', key: 'total', width: '10%' },
  { label: 'Assigned', key: 'assigned', width: '10%' },
  { label: 'Available', key: 'available', width: '10%' },
  { label: 'Not available', key: 'notAvailable', width: '15%' },
  { label: 'Waiting for recycling', key: 'waitingForRecycling', width: '20%' },
  { label: 'Recycled', key: 'recycled', width: '15%' },
];

const ReportMobileRow = ({
  title,
  number,
}: {
  title: string;
  number: React.ReactNode;
}) => (
  <div className="flex items-center justify-between">
    <div className="font-medium">{title}</div>
    <div className="font-semibold">{number}</div>
  </div>
);

export default function AssetReportList() {
  const isDesktop = useIsDesktop();
  const pagination = usePagination({
    sortFields: assetReportSortFields,
    defaultSortField: 'categoryName',
  });
  const { page, searchValue, sortField, sortOrder } = pagination.metadata;
  const { handlePageChange, handleSearch, handleSortColumn, serialize } =
    pagination.handlers;
  const [inputValue, setInputValue] = useState(searchValue);

  useEffect(() => {
    if (searchValue === '') {
      setInputValue('');
    }
  }, [searchValue]);

  const getAssetReportOptions = {
    page,
    take: PAGE_SIZE,
    search: searchValue,
    sortField,
    sortOrder,
  };

  const getAssetReportQueryKey = serialize({ ...getAssetReportOptions });

  const { data: assetReport, isPending } = useGetAssetReport(
    getAssetReportOptions,
    getAssetReportQueryKey,
  );

  const { mutateAsync: getAssetReportFileUrl, isPending: isExporting } =
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by category name"
              className="rounded-md border pr-10"
              data-id="search-category-input"
              onChange={(e) => {
                setInputValue(e.target.value);
                handleSearch(e.target.value);
              }}
              value={inputValue}
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
        <div className="hidden lg:col-span-2 lg:block" />
        <LoadingButton
          variant="default"
          className="lg:col-span-1"
          data-id="export-button"
          onClick={handleExportReport}
          disabled={isExporting}
        >
          Export
        </LoadingButton>
      </div>

      {!isDesktop && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {assetReport && assetReport.data.length > 0 ? (
            assetReport.data.map((row: ReportItem) => (
              <MobileCard key={row.categoryName}>
                <MobileCardContainer>
                  <MobileCardHeader className="mb-2 flex justify-between">
                    <span>{row.categoryName}</span>
                    <div className="text-right font-semibold text-muted-foreground">
                      {row.total}
                    </div>
                  </MobileCardHeader>
                  <MobileCardContent>
                    <ReportMobileRow title="Assigned" number={row.assigned} />
                    <ReportMobileRow title="Available" number={row.available} />
                    <ReportMobileRow
                      title="Not Available"
                      number={row.notAvailable}
                    />
                    <ReportMobileRow
                      title="Waiting for Recycling"
                      number={row.waitingForRecycling}
                    />
                    <ReportMobileRow title="Recycled" number={row.recycled} />
                  </MobileCardContent>
                </MobileCardContainer>
              </MobileCard>
            ))
          ) : (
            <div>{isPending ? 'Loading...' : 'No data to display.'}</div>
          )}
        </div>
      )}

      <div className="hidden rounded-md border lg:block">
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} style={{ width: column.width }}>
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
                  <CustomCell value={row.categoryName} className="py-3 pl-8" />
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
                  No data to display.
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
