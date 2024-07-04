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
import { AssignmentStateOptions } from '@/lib/constants/assignment';
import { PAGE_SIZE } from '@/lib/constants/pagination';
import usePagination from '@/lib/hooks/usePagination';
import { cn } from '@/lib/utils';

import RequestForReturningDialog from '../home/request-for-returning-dialog';
import AssignmentDialog from './components/assignment-dialog';

const columns = [
  { label: 'No.', key: 'id', width: 'w-[8%]' },
  { label: 'Asset Code', key: 'assetCode' },
  { label: 'Asset Name', key: 'assetName' },
  { label: 'Assigned to', key: 'assignedTo' },
  { label: 'Assigned by', key: 'assignedBy' },
  { label: 'Assigned Date', key: 'assignedDate' },
  { label: 'State', key: 'state' },
];

export default function ListAssignmentPage() {
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

  const [dateFrom, setDateFrom] = useQueryState(
    'date',
    parseAsIsoDateTime.withDefault(new Date('2000-01-01')),
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

  const handleDateChange = (date: Date) => {
    setDateFrom(date);
    handlePageChange(1);
  };
  const debounceSetDate = useDebounceCallback(handleDateChange, 500);
  const dateString = dateFrom?.toISOString().split('T')[0];

  const queryOptions = {
    page,
    take: PAGE_SIZE,
    search: searchValue,
    states: assignmentStates,
    sortField,
    sortOrder,
    date: dateString,
  };

  const { data: newAssignment } = useAssignment(`${assignmentId}`, {
    pinned: true,
  });
  const { data } = useAssignments(queryOptions, newAssignment);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-1">
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

        <div className="lg:col-span-1">
          <Input
            defaultValue={dateString}
            type="date"
            className="block"
            onChange={(e) => debounceSetDate(new Date(e.target.value))}
          />
        </div>

        <div className="lg:col-span-1">
          <div className="relative">
            <Input
              defaultValue={searchValue}
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by asset code, asset name or assignee's username"
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

        <Button variant="default" className="lg:col-span-1" asChild>
          <Link href="/assignments/create">Create new assignment</Link>
        </Button>
      </div>

      <div className="rounded-md border">
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
                  className={cn(
                    'cursor-pointer',
                    assignment.id === newAssignment?.id && 'bg-muted shadow-lg',
                  )}
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
                    value={assignment.assignedDate.split('T')[0]}
                  />
                  <CustomCell
                    className="pl-4 text-sm"
                    value={AssignmentStateOptions[assignment.state]}
                  />
                  <TableCell className="py-2 pl-8">
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
                          disabled={
                            assignment.state !==
                            AssignmentState.WAITING_FOR_ACCEPTANCE
                          }
                          className="cursor-pointer"
                          asChild
                        >
                          <Link href={`/assignments/${assignment.id}`}>
                            <Pencil className="mr-4 size-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={
                            assignment.state !==
                            AssignmentState.WAITING_FOR_ACCEPTANCE
                          }
                          className="cursor-pointer"
                        >
                          <Trash2 className="mr-4 size-4" />
                          Delete
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          disabled={
                            assignment.state ===
                            AssignmentState.WAITING_FOR_ACCEPTANCE
                          }
                          className="cursor-pointer"
                          onClick={() => handleReturnRequestClick(assignment)}
                        >
                          <RotateCcw className="mr-4 size-4" />
                          Return
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
