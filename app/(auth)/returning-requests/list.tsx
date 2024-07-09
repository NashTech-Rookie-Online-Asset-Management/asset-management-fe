'use client';

// eslint-disable-next-line simple-import-sort/imports
import {
  ArrowDownAZ,
  ArrowUpAZ,
  Check,
  MoreHorizontal,
  Search,
  X,
} from 'lucide-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  parseAsArrayOf,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
} from 'nuqs';

import { MultipleSelect } from '@/components/custom/multiple-select';
import Pagination from '@/components/custom/pagination';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  MobileCard,
  MobileCardActions,
  MobileCardContainer,
  MobileCardContent,
  MobileCardHeader,
  MobileCardStatus,
} from '@/components/ui/mobile-card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Order, RequestState } from '@/lib/@types/api';
import { PAGE_SIZE } from '@/lib/constants/pagination';
import usePagination from '@/lib/hooks/usePagination';

import { CustomCell } from '@/components/custom/custom-cell';
import type {
  ReturningRequest,
  ReturningRequestSortField,
} from '@/features/returning-request/returning-request.type';
import { returningRequestSortFields } from '@/features/returning-request/returning-request.type';
import useGetReturningRequests from '@/features/returning-request/useGetReturningRequests';
import {
  ReturningRequestStateOptions,
  ReturningRequestStateColors as colors,
} from '@/lib/constants/returning-request';
import { displayDate } from '@/lib/utils/date';
import { useEffect, useState } from 'react';
import CancelReturnDialog from './cancel-return-dialog';
import CompleteReturnDialog from './complete-return-dialog';
import { useIsDesktop } from '@/lib/hooks/useIsDesktop';
import { ColorsBox } from '../components/colors-box';

const columns = [
  { label: 'No.', key: 'id' },
  { label: 'Asset Code', key: 'assetCode' },
  { label: 'Asset Name', key: 'assetName' },
  {
    label: 'Requested by',
    key: 'requestedBy',
  },
  { label: 'Assigned Date', key: 'assignedDate' },
  {
    label: 'Accepted by',
    key: 'acceptedBy',
  },
  { label: 'Returned Date', key: 'returnedDate' },
  { label: 'State', key: 'state' },
];

const ItemDropDownMenu = ({
  row,
  completeClick,
  cancelClick,
}: {
  row: ReturningRequest;
  completeClick: () => void;
  cancelClick: () => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      asChild
      disabled={row.state === RequestState.COMPLETED}
    >
      <Button variant="ghost" className="size-8 p-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="center"
      className="z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        className="cursor-pointer"
        disabled={row.state === RequestState.COMPLETED}
        onClick={completeClick}
      >
        <Check className="mr-4 size-4" />
        Complete request
      </DropdownMenuItem>
      <DropdownMenuItem
        className="cursor-pointer"
        disabled={row.state === RequestState.COMPLETED}
        onClick={cancelClick}
      >
        <X className="mr-4 size-4" />
        Cancel request
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default function ReturningRequestList() {
  const isDesktop = useIsDesktop();
  const statesParser = parseAsArrayOf(
    parseAsStringEnum<RequestState>(Object.values(RequestState)),
  );
  const [selectedRequestStates, setSelectedRequestStates] = useQueryState(
    'states',
    statesParser.withDefault([] as RequestState[]),
  );
  const [returnedDate, setReturnedDate] = useQueryState(
    'returnedDate',
    parseAsString.withDefault(''),
  );

  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedReturningRequest, setSelectedReturningRequest] =
    useState<ReturningRequest | null>(null);

  const pagination = usePagination({
    sortFields: returningRequestSortFields,
    defaultSortField: 'id',
    additionalParamsParsers: {
      states: statesParser,
      returnedDate: parseAsString,
    },
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

  const getReturningRequestsOptions = {
    page,
    take: PAGE_SIZE,
    search: searchValue,
    states: selectedRequestStates as string[],
    returnedDate,
    sortField,
    sortOrder,
  };

  const getReturningRequestsQueryKey = serialize({
    ...getReturningRequestsOptions,
  });

  const { data: returningRequests, isPending } = useGetReturningRequests(
    getReturningRequestsOptions,
    getReturningRequestsQueryKey,
  );

  const handleSetSelectedReturningRequestStates = (selectedItems: string[]) => {
    setSelectedRequestStates(selectedItems as RequestState[]);
    handlePageChange(1);
  };

  const handleSetReturnedDate = (date: string) => {
    setReturnedDate(date);
    handlePageChange(1);
  };

  const handleCompleteClick = (request: ReturningRequest) => {
    setSelectedReturningRequest(request);
    setCompleteDialogOpen(true);
  };

  const handleCancelClick = (request: ReturningRequest) => {
    setSelectedReturningRequest(request);
    setCancelDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <MultipleSelect
            data-id="input-states"
            title="State"
            items={[
              {
                label: ReturningRequestStateOptions[RequestState.COMPLETED],
                value: RequestState.COMPLETED,
              },
              {
                label:
                  ReturningRequestStateOptions[
                    RequestState.WAITING_FOR_RETURNING
                  ],
                value: RequestState.WAITING_FOR_RETURNING,
              },
            ]}
            selectedItems={selectedRequestStates as string[]}
            setSelectedItems={handleSetSelectedReturningRequestStates}
          />
        </div>
        <div className="lg:col-span-1">
          <Input
            data-id="input-date"
            type="date"
            className="block"
            value={returnedDate}
            onChange={(e) => handleSetReturnedDate(e.target.value)}
          />
        </div>
        <div className="lg:col-span-2">
          <div className="relative">
            <Input
              data-id="input-search"
              type="text"
              placeholder="Search by asset code, asset name, requester's username"
              className="rounded-md border pr-10"
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
      </div>

      {!isDesktop && (
        <ColorsBox texts={ReturningRequestStateOptions} colors={colors} />
      )}

      {!isDesktop && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {returningRequests && returningRequests.data.length > 0 ? (
            returningRequests.data.map((row: ReturningRequest) => (
              <MobileCard key={row.id}>
                <MobileCardActions>
                  <ItemDropDownMenu
                    row={row}
                    completeClick={() => handleCompleteClick(row)}
                    cancelClick={() => handleCancelClick(row)}
                  />
                </MobileCardActions>
                <MobileCardStatus
                  color={colors[row.state]}
                  className="rounded-b-none"
                />
                <MobileCardContainer>
                  <MobileCardHeader>
                    {row.assignment.asset.assetCode}
                  </MobileCardHeader>
                  <MobileCardContent>
                    <p>{row.assignment.asset.name}</p>
                    <p>
                      <span className="text-muted-foreground">
                        Requested By:
                      </span>{' '}
                      {row.requestedBy.username}
                    </p>
                    {row?.acceptedBy?.username && (
                      <p>
                        <span className="text-muted-foreground">
                          Accepted By:
                        </span>{' '}
                        {row?.acceptedBy?.username}
                      </p>
                    )}
                    {row.returnedDate && <p>{displayDate(row.returnedDate)}</p>}
                  </MobileCardContent>
                </MobileCardContainer>
              </MobileCard>
            ))
          ) : (
            <div>{isPending ? 'Loading...' : 'No requests to display.'}</div>
          )}
        </div>
      )}

      <div className="hidden rounded-md border lg:block">
        <Table className="table-fixed" data-id="table">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      handleSortColumn(column.key as ReturningRequestSortField)
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
              <TableHead className="w-12 p-0" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {returningRequests && returningRequests.data.length > 0 ? (
              returningRequests.data.map((row: ReturningRequest) => (
                <TableRow key={row.id} data-id={`row-${row.id}`}>
                  <CustomCell value={`${row.id}`} />
                  <CustomCell value={row.assignment.asset.assetCode} />
                  <CustomCell value={row.assignment.asset.name} />
                  <CustomCell value={row.requestedBy.username} />
                  <CustomCell
                    value={displayDate(row.assignment.assignedDate)}
                  />
                  <CustomCell value={row?.acceptedBy?.username || ''} />
                  <CustomCell
                    value={
                      row.returnedDate ? displayDate(row.returnedDate) : ''
                    }
                  />
                  <CustomCell value={ReturningRequestStateOptions[row.state]} />
                  <CustomCell
                    className="aspect-square w-12 px-0"
                    disableTooltip
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        disabled={row.state === RequestState.COMPLETED}
                      >
                        <Button variant="ghost" className="size-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="center"
                        className="z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          disabled={row.state === RequestState.COMPLETED}
                          onClick={() => handleCompleteClick(row)}
                        >
                          <Check className="mr-4 size-4" />
                          Complete request
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          disabled={row.state === RequestState.COMPLETED}
                          onClick={() => handleCancelClick(row)}
                        >
                          <X className="mr-4 size-4" />
                          Cancel request
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CustomCell>
                </TableRow>
              ))
            ) : (
              <TableRow data-id="row-empty">
                <TableCell
                  colSpan={9}
                  className="py-2 text-center text-gray-400"
                >
                  No requests to display.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination
        totalPages={returningRequests?.pagination.totalPages || 0}
        currentPage={page}
        onPageChange={handlePageChange}
      />

      {selectedReturningRequest && (
        <CompleteReturnDialog
          isOpen={completeDialogOpen}
          onOpenChange={setCompleteDialogOpen}
          request={selectedReturningRequest}
        />
      )}

      {selectedReturningRequest && (
        <CancelReturnDialog
          isOpen={cancelDialogOpen}
          onOpenChange={setCancelDialogOpen}
          request={selectedReturningRequest}
        />
      )}
    </div>
  );
}
