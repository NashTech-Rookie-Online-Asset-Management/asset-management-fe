'use client';

import { formatDistanceToNow } from 'date-fns';
import {
  ArrowDownAZ,
  ArrowUpAZ,
  Check,
  LoaderCircle,
  MoreHorizontal,
  Search,
  Undo,
  X,
} from 'lucide-react';

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
  Assignment,
  MyAssignmentSortField,
} from '@/features/assignment/assignment.types';
import { myAssignmentsSortFields } from '@/features/assignment/assignment.types';
import useGetMyAssignments from '@/features/assignment/useGetMyAssignments';
import { Order } from '@/lib/@types/api';
import { AssignmentStateOptions } from '@/lib/constants/assignments';
import { PAGE_SIZE } from '@/lib/constants/pagination';
import usePagination from '@/lib/hooks/usePagination';

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
    defaultSortField: myAssignmentsSortFields[0],
  });
  const { page, searchValue, sortField, sortOrder } = pagination.metadata;
  const { handlePageChange, handleSearch, handleSortColumn } =
    pagination.handlers;

  const fetchOptions = {
    page,
    search: searchValue,
    sortField,
    sortOrder,
    take: PAGE_SIZE,
  };

  const { data: assignments, isPending } = useGetMyAssignments(fetchOptions);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-3" />
        <div className="lg:col-span-1">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by name, asset code"
              className="rounded-md border pr-10"
              onChange={(e) => handleSearch(e.target.value)}
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
                  //   onClick={() => handleOpenDialog(row.id)}
                  className="cursor-pointer"
                >
                  <CustomCell value={row.asset.assetCode} />
                  <CustomCell value={row.asset.name} />
                  <CustomCell value={row.asset.category.name} />
                  <CustomCell
                    value={formatDistanceToNow(new Date(row.assignedDate))}
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
                          //   disabled={row.state === AssetState.ASSIGNED}
                        >
                          <Check className="mr-4 size-4" />
                          Accept
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          //   disabled={row.state === AssetState.ASSIGNED}
                        >
                          <X className="mr-4 size-4" />
                          Decline
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          //   disabled={row.state === AssetState.ASSIGNED}
                          className="cursor-pointer"
                          //   onClick={() => {
                          //     handleDeleteDialog(row);
                          //   }}
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
    </div>
  );
}

export default MyAssignments;
