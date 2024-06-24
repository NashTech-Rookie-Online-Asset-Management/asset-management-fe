/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */

'use client';

import {
  ArrowDownAZ,
  ArrowUpAZ,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
import { AccountType } from '@/features/model';
import useGetUsers from '@/features/user/useGetUsers';
import type { User, UserSortField } from '@/features/user/user.types';
import { Order } from '@/lib/@types/api';
import { PAGE_SIZE } from '@/lib/constants/pagination';
import { AccountTypeOptions } from '@/lib/constants/user';
import useDebounce from '@/lib/hooks/useDebounce';
import { displayDate } from '@/lib/utils/date';

import DetailedUserDialog from '../components/show-detailed-user-dialog';

const columns = [
  { label: 'Staff Code', key: 'staffCode' },
  { label: 'Full Name', key: 'name' },
  { label: 'Username', key: '' },
  { label: 'Joined Date', key: 'joinedDate' },
  {
    label: 'Type',
    key: 'type',
  },
];

export default function UserList() {
  const searchParams = useSearchParams();
  const newUserParam = searchParams.get('new');

  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 700);
  const [selectedUserTypes, setSelectedUsertTypes] = useState<string[]>([
    AccountType.ADMIN,
    AccountType.STAFF,
  ]);
  const sortFieldName =
    newUserParam === 'true' ? 'updatedAt' : ('name' as UserSortField);
  const [sortField, setSortField] = useState<UserSortField>(sortFieldName);
  const sortOrderValue = newUserParam === 'true' ? Order.DESC : Order.ASC;
  const [sortOrder, setSortOrder] = useState<Order>(sortOrderValue);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);

  const { data: users, refetch: refetchUsers } = useGetUsers({
    page,
    take: PAGE_SIZE,
    search: debouncedSearchValue,
    types: selectedUserTypes,
    sortField,
    sortOrder,
  });

  useEffect(() => {
    refetchUsers();
  }, [
    page,
    debouncedSearchValue,
    selectedUserTypes,
    sortField,
    sortOrder,
    refetchUsers,
  ]);

  useEffect(() => {
    if (newUserParam === 'true') {
      history.replaceState({ new: true }, '', '/users');
    }
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setPage(1);
  };

  const handleSetSelectedUsertTypes = (selectedItems: string[]) => {
    setSelectedUsertTypes(selectedItems);
    setPage(1);
  };

  const handleSortColumn = (column: UserSortField) => {
    if (sortField === column) {
      setSortOrder((prevOrder) =>
        prevOrder === Order.ASC ? Order.DESC : Order.ASC,
      );
    } else {
      setSortField(column);
      setSortOrder(Order.ASC);
    }
  };

  const handleOpenDialog = (username: string) => {
    setSelectedUsername(username);
    setDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <MultipleSelect
            title="State"
            items={[
              {
                label: AccountTypeOptions[AccountType.ADMIN],
                value: AccountType.ADMIN,
              },
              {
                label: AccountTypeOptions[AccountType.STAFF],
                value: AccountType.STAFF,
              },
            ]}
            selectedItems={selectedUserTypes}
            setSelectedItems={(selectedItems: string[]) =>
              handleSetSelectedUsertTypes(selectedItems)
            }
          />
        </div>
        <div className="lg:col-span-1" />
        <div className="lg:col-span-1">
          <Input
            type="text"
            placeholder="Search by name or staff code"
            className="rounded-md border"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Button variant="default" className="lg:col-span-1" asChild>
          <Link href="/users/create">Create new user</Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead className="text-center" key={column.key}>
                  {column.key === '' ? (
                    <div key={column.key} className="px-4 py-2">
                      {column.label}
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      onClick={() =>
                        handleSortColumn(column.key as UserSortField)
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
                  )}
                </TableHead>
              ))}
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {users && users.data.length > 0 ? (
              users.data.map((row: User) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleOpenDialog(row.username)}
                  className="cursor-pointer"
                >
                  <TableCell className="py-2 text-center">
                    {row.staffCode}
                  </TableCell>
                  <TableCell className="py-2 text-center">{`${row.firstName} ${row.lastName}`}</TableCell>
                  <TableCell className="py-2 text-center">
                    {row.username}
                  </TableCell>
                  <TableCell className="py-2 text-center">
                    {displayDate(row.joinedAt)}
                  </TableCell>
                  <TableCell className="py-2 text-center">
                    {AccountTypeOptions[row.type]}
                  </TableCell>
                  <TableCell className="py-2 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="size-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Pencil className="mr-4 size-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled>
                          <Trash2 className="mr-4 size-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-2 text-center text-gray-400"
                >
                  No users to display.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination
        totalPages={users?.pagination.totalPages || 0}
        currentPage={page}
        onPageChange={handlePageChange}
      />

      {dialogOpen && selectedUsername && (
        <DetailedUserDialog
          username={selectedUsername}
          isOpen={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </div>
  );
}
