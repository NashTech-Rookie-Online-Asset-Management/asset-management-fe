'use client';

import {
  ArrowDownAZ,
  ArrowUpAZ,
  MoreHorizontal,
  Pencil,
  RotateCcw,
  Search,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsStringEnum,
  useQueryState,
} from 'nuqs';
import { useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

import { CustomCell } from '@/components/custom/custom-cell';
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
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useAssignment,
  useAssignments,
} from '@/features/assignment/assignment.hook';
import type {
  Assignment,
  AssignmentSortField,
} from '@/features/assignment/assignment.types';
import { AssignmentState, Order } from '@/lib/@types/api';
import {
  AssignmentStateColors as colors,
  AssignmentStateOptions,
} from '@/lib/constants/assignment';
import { PAGE_SIZE } from '@/lib/constants/pagination';
import { useIsDesktop } from '@/lib/hooks/useIsDesktop';
import usePagination from '@/lib/hooks/usePagination';
import { cn } from '@/lib/utils';
import { displayDate, inputDateConvert } from '@/lib/utils/date';

import { ColorsBox } from '../components/colors-box';
import RequestForReturningDialog from '../home/request-for-returning-dialog';
import AssignmentDialog from './components/assignment-dialog';
import DeleteAssignmentDialog from './components/delete-assignment-dialog';

const columns = [
  { label: 'No.', key: 'id', width: 'w-[8%]' },
  { label: 'Asset Code', key: 'assetCode' },
  { label: 'Asset Name', key: 'assetName' },
  { label: 'Assigned to', key: 'assignedTo' },
  { label: 'Assigned by', key: 'assignedBy' },
  { label: 'Assigned Date', key: 'assignedDate' },
  { label: 'State', key: 'state' },
];

const ItemDropDownMenu = ({
  row,
  deleteClick,
  returnClick,
}: {
  row: Assignment;
  deleteClick: () => void;
  returnClick: () => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
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
        disabled={row.state !== AssignmentState.WAITING_FOR_ACCEPTANCE}
        className="cursor-pointer"
        asChild
      >
        <Link href={`/assignments/${row.id}`}>
          <Pencil className="mr-4 size-4" />
          Edit
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        disabled={
          ![
            AssignmentState.WAITING_FOR_ACCEPTANCE,
            AssignmentState.DECLINED,
          ].includes(row.state)
        }
        className="cursor-pointer"
        onClick={deleteClick}
      >
        <Trash2 className="mr-4 size-4" />
        Delete
      </DropdownMenuItem>

      <DropdownMenuItem
        disabled={[
          AssignmentState.WAITING_FOR_ACCEPTANCE,
          AssignmentState.DECLINED,
        ].includes(row.state)}
        className="cursor-pointer"
        onClick={returnClick}
      >
        <RotateCcw className="mr-4 size-4" />
        Return
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default function AssignmentList() {
  const isDesktop = useIsDesktop();
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const [returningRequestDialog, setReturningRequestDialog] = useState(false);

  const handleSetAssignment = (data: Assignment) => {
    setSelectedAssignment(data);
    setOpenAssignmentDialog(true);
  };

  const handleReturnRequestClick = (data: Assignment) => {
    setSelectedAssignment(data);
    setReturningRequestDialog(true);
  };

  const [assignmentId] = useQueryState(
    'assignmentId',
    parseAsInteger.withDefault(-1),
  );

  const statesParser = parseAsArrayOf(
    parseAsStringEnum<AssignmentState>(Object.values(AssignmentState)),
  );

  const [assignmentStates, setAssignmentStates] = useQueryState(
    'states',
    statesParser.withDefault([
      AssignmentState.ACCEPTED,
      AssignmentState.DECLINED,
      AssignmentState.WAITING_FOR_ACCEPTANCE,
    ]),
  );

  const [dateFrom, setDateFrom] = useQueryState('date', parseAsIsoDateTime);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletedAssignment, setDeletedAssignment] = useState<Assignment | null>(
    null,
  );

  const pagination = usePagination({
    sortFields: [
      'id',
      'assetCode',
      'assetName',
      'assignedTo',
      'assignedBy',
      'assignedDate',
      'state',
    ],
    defaultSortField: 'id',
    additionalParamsParsers: {
      states: statesParser,
      date: parseAsIsoDateTime,
    },
  });

  const { page, searchValue, sortField, sortOrder } = pagination.metadata;
  const { handlePageChange, handleSearch, handleSortColumn } =
    pagination.handlers;

  const handleAssignmentStateChange = (state: string[]) => {
    setAssignmentStates(state as AssignmentState[]);
    handlePageChange(1);
  };

  const handleDateChange = (date: string) => {
    try {
      setDateFrom(new Date(date));
    } catch {
      setDateFrom(null);
    }
    handlePageChange(1);
  };
  const debounceSetDate = useDebounceCallback(handleDateChange, 500);
  const dateString = inputDateConvert(dateFrom || '');

  const queryOptions = {
    page,
    take: isDesktop ? PAGE_SIZE : 5,
    search: searchValue,
    states: assignmentStates,
    sortField,
    sortOrder,
    date: dateString || undefined,
  };

  const { data: newAssignment } = useAssignment(`${assignmentId}`, {
    pinned: true,
  });
  const { data } = useAssignments(queryOptions, newAssignment);

  const handleDeleteDialog = (assignment: Assignment) => {
    setDeletedAssignment(assignment);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-12">
        <div className="col-span-1 xl:col-span-3">
          <MultipleSelect
            title="State"
            items={[
              {
                label: AssignmentStateOptions[AssignmentState.ACCEPTED],
                value: AssignmentState.ACCEPTED,
              },
              {
                label: AssignmentStateOptions[AssignmentState.DECLINED],
                value: AssignmentState.DECLINED,
              },
              {
                label:
                  AssignmentStateOptions[
                    AssignmentState.WAITING_FOR_ACCEPTANCE
                  ],
                value: AssignmentState.WAITING_FOR_ACCEPTANCE,
              },
            ]}
            selectedItems={assignmentStates as string[]}
            setSelectedItems={handleAssignmentStateChange}
          />
        </div>

        <div className="col-span-1 xl:col-span-2">
          <Input
            defaultValue={dateString}
            type="date"
            className="block"
            onChange={(e) => debounceSetDate(e.target.value)}
          />
        </div>

        <div className="col-span-1 xl:col-span-4">
          <div className="relative">
            <Input
              defaultValue={searchValue}
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by asset code, name or assignee"
              className="rounded-md border pr-10"
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

        <Button variant="default" className="col-span-1 xl:col-span-3" asChild>
          <Link href="/assignments/create">Create new assignment</Link>
        </Button>
      </div>

      {!isDesktop && (
        <>
          <ColorsBox texts={AssignmentStateOptions} colors={colors} />
          <div className="flex flex-col space-y-2">
            {data && data.data.length > 0 ? (
              data.data.map((row: Assignment) => (
                <MobileCard
                  key={row.id}
                  onClick={() => handleSetAssignment(row)}
                >
                  <MobileCardActions>
                    <ItemDropDownMenu
                      row={row}
                      deleteClick={() => handleDeleteDialog(row)}
                      returnClick={() => handleReturnRequestClick(row)}
                    />
                  </MobileCardActions>
                  <MobileCardStatus
                    color={colors[row.state]}
                    className="rounded-b-none"
                  />
                  <MobileCardContainer>
                    <MobileCardHeader>{row.asset.assetCode}</MobileCardHeader>
                    <MobileCardContent>
                      <p>{row.asset.category.name}</p>
                      <p>{row.asset.name}</p>
                      <p>{displayDate(row.assignedDate)}</p>
                      <div className="flex items-center space-x-2">
                        <p>
                          <span className="text-muted-foreground">To:</span>{' '}
                          {row.assignedTo.username}
                        </p>
                        <Separator orientation="vertical" className="h-4" />
                        <p>
                          <span className="text-muted-foreground">By:</span>{' '}
                          {row.assignedBy.username}
                        </p>
                      </div>
                    </MobileCardContent>
                  </MobileCardContainer>
                </MobileCard>
              ))
            ) : (
              <div>No assignments to display.</div>
            )}
          </div>
        </>
      )}

      <div className="hidden rounded-md border md:block">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(column.width || 'auto', 'px-0')}
                >
                  <Button
                    onClick={() =>
                      handleSortColumn(column.key as AssignmentSortField)
                    }
                    variant="ghost"
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
              <TableHead className="w-20" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data && data.data.length > 0 ? (
              data.data.map((assignment) => (
                <TableRow
                  key={assignment.id}
                  onClick={() => handleSetAssignment(assignment)}
                  data-state={assignment.pinned && 'selected'}
                  className="cursor-pointer"
                >
                  <CustomCell
                    className="pl-4 text-sm"
                    value={assignment.id.toString()}
                  />
                  <CustomCell
                    className="pl-4 text-sm"
                    value={assignment.asset.assetCode}
                  />
                  <CustomCell
                    className="pl-4 text-sm"
                    value={assignment.asset.name}
                  />
                  <CustomCell
                    className="pl-4 text-sm"
                    value={assignment.assignedTo.username}
                  />
                  <CustomCell
                    className="pl-4 text-sm"
                    value={assignment.assignedBy.username}
                  />
                  <CustomCell
                    className="pl-4 text-sm"
                    value={displayDate(assignment.assignedDate)}
                  />
                  <CustomCell
                    className="pl-4 text-sm"
                    value={AssignmentStateOptions[assignment.state]}
                  />
                  <TableCell className="py-2 pl-8">
                    <ItemDropDownMenu
                      row={assignment}
                      deleteClick={() => handleDeleteDialog(assignment)}
                      returnClick={() => handleReturnRequestClick(assignment)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-2 text-center text-gray-400"
                >
                  No assignments to display.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination
        totalPages={data?.pagination.totalPages || 0}
        currentPage={page}
        onPageChange={handlePageChange}
      />

      {selectedAssignment && (
        <AssignmentDialog
          assignmentId={selectedAssignment.id}
          open={openAssignmentDialog}
          onOpenChange={setOpenAssignmentDialog}
        />
      )}

      {deleteDialogOpen && deletedAssignment && (
        <DeleteAssignmentDialog
          assignment={deletedAssignment}
          isOpen={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        />
      )}

      {selectedAssignment && (
        <RequestForReturningDialog
          assignment={selectedAssignment}
          isOpen={returningRequestDialog}
          onOpenChange={setReturningRequestDialog}
        />
      )}
    </div>
  );
}
