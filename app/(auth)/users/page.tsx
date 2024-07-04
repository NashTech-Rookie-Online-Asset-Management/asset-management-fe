'use client';

// eslint-disable-next-line simple-import-sort/imports
import {
  ArrowDownAZ,
  ArrowUpAZ,
  MoreHorizontal,
  Pencil,
  Search,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import {
  parseAsArrayOf,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
} from 'nuqs';
import { useState } from 'react';

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
import useProfile from '@/features/auth/useProfile';
import useGetUser from '@/features/user/useGetUser';
import useGetUsers from '@/features/user/useGetUsers';
import {
  userSortFields,
  type User,
  type UserSortField,
} from '@/features/user/user.types';
import { AccountType, Order } from '@/lib/@types/api';
import { PAGE_SIZE } from '@/lib/constants/pagination';
import { AccountTypeOptions } from '@/lib/constants/user';
import usePagination from '@/lib/hooks/usePagination';
import { displayDate } from '@/lib/utils/date';

import { CustomCell } from '@/components/custom/custom-cell';
import { cn } from '@/lib/utils';
import DeleteUserDialog from '../components/delete-user-dialog';
import DetailedUserDialog from '../components/show-detailed-user-dialog';

const columns = [
  { label: 'Staff Code', key: 'staffCode' },
  { label: 'Full Name', key: 'name' },
  { label: 'Username', key: '' },
  { label: 'Joined Date', key: 'joinedAt' },
  { label: 'Type', key: 'type' },
];

export default function UserList() {
  const [newUserUsername] = useQueryState(
    'newUserUsername',
    parseAsString.withDefault(''),
  );

  const { data: newUser } = useGetUser(newUserUsername, { pinned: true });

  const typesParser = parseAsArrayOf(
    parseAsStringEnum<AccountType>(Object.values(AccountType)),
  );
  const [selectedUserTypes, setSelectedUsertTypes] = useQueryState(
    'types',
    typesParser.withDefault([] as AccountType[]),
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletedUser, setDeletedUser] = useState<User | null>(null);
  const { data: userProfile } = useProfile();

  const pagination = usePagination({
    sortFields: userSortFields,
    defaultSortField: 'name',
    additionalParamsParsers: {
      types: typesParser,
    },
  });

  const { page, searchValue, sortField, sortOrder } = pagination.metadata;
  const { handlePageChange, handleSearch, handleSortColumn, serialize } =
    pagination.handlers;

  const getUsersOptions = {
    page,
    take: PAGE_SIZE,
    search: searchValue,
    types: selectedUserTypes,
    sortField,
    sortOrder,
  };

  const getUsersQueryKey = serialize({ ...getUsersOptions });

  const { data: users } = useGetUsers(
    getUsersOptions,
    getUsersQueryKey,
    newUser,
  );

  const handleSetSelectedUsertTypes = (selectedItems: string[]) => {
    setSelectedUsertTypes(selectedItems as AccountType[]);
    handlePageChange(1);
  };

  const handleOpenDialog = (username: string) => {
    setSelectedUsername(username);
    setDialogOpen(true);
  };

  const handleDeleteDialog = (user: User) => {
    setDeletedUser(user);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <MultipleSelect
            title="Type"
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
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by name, staff code"
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
        <Button
          variant="default"
          className="lg:col-span-1"
          asChild
          data-id="create-button"
        >
          <Link href={`/users/create${getUsersQueryKey}`}>Create new user</Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>
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
                  className={cn(
                    'cursor-pointer',
                    newUser?.id === row.id && 'bg-muted shadow-lg',
                  )}
                >
                  <CustomCell value={row.staffCode} />
                  <CustomCell value={row.fullName} />
                  <CustomCell value={row.username} />
                  <CustomCell value={displayDate(row.joinedAt)} />
                  <CustomCell value={AccountTypeOptions[row.type]} />
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
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          asChild
                          disabled={row.type === userProfile?.type}
                        >
                          <Link
                            href={`/users/${row.username}${getUsersQueryKey}`}
                          >
                            <Pencil className="mr-4 size-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={row.type === userProfile?.type}
                          className="cursor-pointer"
                          onClick={() => {
                            handleDeleteDialog(row);
                          }}
                        >
                          <Trash2 className="mr-4 size-4" />
                          Disable
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

      {deleteDialogOpen && deletedUser && (
        <DeleteUserDialog
          user={deletedUser}
          isOpen={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        />
      )}
    </div>
  );
}
