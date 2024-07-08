'use client';

import {
  ArrowDownAZ,
  ArrowUpAZ,
  Check,
  LoaderCircle,
  MoreHorizontal,
  Undo,
  X,
} from 'lucide-react';
import { useState } from 'react';

import { CustomCell } from '@/components/custom/custom-cell';
import Pagination from '@/components/custom/pagination';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type {
  Assignment,
  MyAssignmentSortField,
} from '@/features/assignment/assignment.types';
import { myAssignmentsSortFields } from '@/features/assignment/assignment.types';
import useGetMyAssignments from '@/features/assignment/useGetMyAssignments';
import { AssignmentState, Order } from '@/lib/@types/api';
import { AssignmentStateOptions } from '@/lib/constants/assignment';
import { PAGE_SIZE } from '@/lib/constants/pagination';
import usePagination from '@/lib/hooks/usePagination';
import { displayDate } from '@/lib/utils/date';

import AssignmentDialog from '../assignments/components/assignment-dialog';
import AcceptAssignmentDialog from './accept-assignment-dialog';
import DeclineAssignmentDialog from './decline-assignment-dialog';
import RequestForReturningDialog from './request-for-returning-dialog';

const columns = [
  { label: 'Asset Code', key: 'assetCode' },
  { label: 'Asset Name', key: 'name' },
  { label: 'Category', key: 'category' },
  { label: 'Assigned Date', key: 'assignedDate' },
  { label: 'State', key: 'state' },
];

function MyAssignments() {
  const pagination = usePagination({
    sortFields: myAssignmentsSortFields,
    defaultSortField: 'name',
  });
  const { page, searchValue, sortField, sortOrder } = pagination.metadata;
  const { handlePageChange, handleSortColumn } = pagination.handlers;

  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [declineDialogOpen, setDeclineDialogOpen] = useState(false);
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  const { data: assignments, isPending } = useGetMyAssignments({
    page,
    search: searchValue,
    sortField,
    sortOrder,
    take: PAGE_SIZE,
  });

  const handleAcceptClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setAcceptDialogOpen(true);
  };

  const handleDeclineClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setDeclineDialogOpen(true);
  };

  const handleReturnClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setReturnDialogOpen(true);
  };

  const handleOpenAssignmentClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setOpenAssignmentDialog(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative rounded-md border">
        {isPending && (
          <LoaderCircle className="absolute right-0 top-0 m-4 size-4 animate-spin" />
        )}
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      handleSortColumn(column.key as MyAssignmentSortField)
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
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments && assignments.data.length > 0 ? (
              assignments.data.map((row: Assignment) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleOpenAssignmentClick(row)}
                  className="cursor-pointer"
                >
                  <CustomCell value={row.asset.assetCode} />
                  <CustomCell value={row.asset.name} />
                  <CustomCell value={row.asset.category.name} />
                  <CustomCell
                    value={displayDate(row.assignedDate.toString())}
                  />
                  <CustomCell value={AssignmentStateOptions[row.state]} />
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
                          className="cursor-pointer"
                          disabled={
                            row.state !== AssignmentState.WAITING_FOR_ACCEPTANCE
                          }
                          onClick={() => handleAcceptClick(row)}
                        >
                          <Check className="mr-4 size-4" />
                          Accept
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          disabled={
                            row.state !== AssignmentState.WAITING_FOR_ACCEPTANCE
                          }
                          onClick={() => handleDeclineClick(row)}
                        >
                          <X className="mr-4 size-4" />
                          Decline
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={row.state !== AssignmentState.ACCEPTED}
                          className="cursor-pointer"
                          onClick={() => handleReturnClick(row)}
                        >
                          <Undo className="mr-4 size-4" />
                          Request for returning
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
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
        totalPages={assignments?.pagination.totalPages ?? 0}
        currentPage={page}
        onPageChange={handlePageChange}
      />

      {selectedAssignment && (
        <AcceptAssignmentDialog
          isOpen={acceptDialogOpen}
          onOpenChange={setAcceptDialogOpen}
          assignment={selectedAssignment}
        />
      )}

      {selectedAssignment && (
        <DeclineAssignmentDialog
          isOpen={declineDialogOpen}
          onOpenChange={setDeclineDialogOpen}
          assignment={selectedAssignment}
        />
      )}

      {selectedAssignment && (
        <RequestForReturningDialog
          isOpen={returnDialogOpen}
          onOpenChange={setReturnDialogOpen}
          assignment={selectedAssignment}
        />
      )}

      {selectedAssignment && (
        <AssignmentDialog
          assignmentId={selectedAssignment.id}
          open={openAssignmentDialog}
          onOpenChange={setOpenAssignmentDialog}
        />
      )}
    </div>
  );
}

export default MyAssignments;
