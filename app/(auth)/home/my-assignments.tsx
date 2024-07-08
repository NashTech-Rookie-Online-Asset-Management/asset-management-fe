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
import type {
  Assignment,
  MyAssignmentSortField,
} from '@/features/assignment/assignment.types';
import { myAssignmentsSortFields } from '@/features/assignment/assignment.types';
import useGetMyAssignments from '@/features/assignment/useGetMyAssignments';
import { AssignmentState, Order } from '@/lib/@types/api';
import {
  AssignmentStateColors as colors,
  AssignmentStateOptions,
} from '@/lib/constants/assignment';
import { PAGE_SIZE } from '@/lib/constants/pagination';
import { useIsDesktop } from '@/lib/hooks/useIsDesktop';
import usePagination from '@/lib/hooks/usePagination';
import { cn } from '@/lib/utils';
import { displayDate } from '@/lib/utils/date';

import AssignmentDialog from '../assignments/components/assignment-dialog';
import { ColorsBox } from '../components/colors-box';
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

const ItemDropDownMenu = ({
  row,
  acceptClick,
  declineClick,
  returnClick,
}: {
  row: Assignment;
  acceptClick: () => void;
  declineClick: () => void;
  returnClick: () => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="md:size-4" />
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
          disabled={row.state !== AssignmentState.WAITING_FOR_ACCEPTANCE}
          onClick={acceptClick}
        >
          <Check className="mr-4 size-4" />
          Accept
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          disabled={row.state !== AssignmentState.WAITING_FOR_ACCEPTANCE}
          onClick={declineClick}
        >
          <X className="mr-4 size-4" />
          Decline
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={row.state !== AssignmentState.ACCEPTED}
          className="cursor-pointer"
          onClick={returnClick}
        >
          <Undo className="mr-4 size-4" />
          Request for returning
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

function MyAssignments() {
  const isDesktop = useIsDesktop();
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
    <div className={cn('flex flex-col gap-2')}>
      {!isDesktop && (
        <ColorsBox texts={AssignmentStateOptions} colors={colors} />
      )}
      <div className="relative rounded-md md:border">
        {isPending && (
          <LoaderCircle className="absolute right-0 top-0 m-4 size-4 animate-spin" />
        )}
        {!isDesktop && (
          <div className="flex flex-col space-y-2">
            {assignments && assignments.data.length > 0 ? (
              assignments.data.map((row: Assignment) => (
                <MobileCard
                  key={row.id}
                  onClick={() => handleOpenAssignmentClick(row)}
                >
                  <MobileCardActions>
                    <ItemDropDownMenu
                      row={row}
                      acceptClick={() => handleAcceptClick(row)}
                      declineClick={() => handleDeclineClick(row)}
                      returnClick={() => handleReturnClick(row)}
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
                    </MobileCardContent>
                  </MobileCardContainer>
                </MobileCard>
              ))
            ) : (
              <div>No assignments to display.</div>
            )}
          </div>
        )}
        {isDesktop && (
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
                      <ItemDropDownMenu
                        row={row}
                        acceptClick={() => handleAcceptClick(row)}
                        declineClick={() => handleDeclineClick(row)}
                        returnClick={() => handleReturnClick(row)}
                      />
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
        )}
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
