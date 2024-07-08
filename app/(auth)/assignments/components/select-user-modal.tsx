'use client';

import { ArrowDownAZ, ArrowUpAZ, Search } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import Pagination from '@/components/custom/pagination';
import { TypographyH5 } from '@/components/typos/h5';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Table,
  TableBody,
  TableCell as CoreTableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAvailableUser } from '@/features/assignment/assignment.hook';
import type { AvailableUser } from '@/features/assignment/assignment.types';
import { Order } from '@/lib/@types/api';
import { AccountTypeOptions } from '@/lib/constants/user';

import type { ModalProps, TableCol } from './base';
import { onModalClose, TableCell, usePaginate } from './base';

const colums = [
  {
    name: 'Staff Code',
    key: 'staffCode',
    sort: true,
  },
  {
    name: 'Full Name',
    key: 'fullName',
    sort: true,
  },
  {
    name: 'Type',
    key: 'type',
    sort: true,
  },
];

function UserTableRow({ user }: { user: AvailableUser }) {
  return (
    <TableRow key={user.staffCode}>
      <TableCell htmlFor={user.staffCode}>
        <RadioGroupItem value={user.staffCode} id={user.staffCode} />
      </TableCell>
      <TableCell htmlFor={user.staffCode}>{user.staffCode}</TableCell>
      <TableCell htmlFor={user.staffCode}>{user.fullName}</TableCell>
      <TableCell htmlFor={user.staffCode}>
        {AccountTypeOptions[user.type]}
      </TableCell>
    </TableRow>
  );
}

export default function SelectUserModal(props: ModalProps<AvailableUser>) {
  const { id } = useParams();
  const [staffCode, setStaffCode] = useState('');
  const { pagination, setPagination } = usePaginate(5, 300, 'fullName');

  const { data } = useAvailableUser(pagination, id);

  const onSave = () => {
    const user =
      data && data.data.find((userTmp) => userTmp.staffCode === staffCode);
    if (user) {
      props.onSelect(user);
    } else if (props.assignment) {
      props.onSelect(props.assignment.assignedTo);
    }
    props.setOpen(false);
  };

  const handleTableHeaderClick = ({ key, sort }: TableCol) => {
    if (!sort) return;

    if (pagination.sortField !== key) {
      setPagination('sortField', key);
      setPagination('sortOrder', 'asc');
    } else {
      const order = pagination.sortOrder === 'asc' ? 'desc' : 'asc';
      setPagination('sortOrder', order);
    }
  };

  const onClose = () =>
    onModalClose(props, staffCode, () =>
      setStaffCode(props.currentForm.assignedTo.staffCode),
    );

  return (
    <Dialog open={props.open} onOpenChange={onClose}>
      <DialogContent hideCloseButton className="max-w-3xl py-3">
        <DialogHeader className="flex flex-row items-center justify-between">
          <TypographyH5 className="text-primary">Select User</TypographyH5>
          <div className="relative w-5/12">
            <Input
              defaultValue={pagination.search}
              placeholder="Search by name or staff code"
              className="placeholder:text-slate-400"
              onChange={(e) => setPagination('search', e.target.value)}
            />
            <Search className="absolute right-0 top-0 m-2.5 size-4 cursor-pointer text-muted-foreground transition-colors hover:text-primary" />
          </div>
        </DialogHeader>
        <RadioGroup
          value={staffCode || props.assignment?.assignedTo.staffCode}
          onValueChange={(value) => setStaffCode(value)}
        >
          <div className="relative max-h-[60vh] overflow-y-auto">
            <Table className="table-fixed">
              <TableHeader className="sticky top-0 z-10 bg-background">
                <TableRow>
                  <TableHead className="w-20" />
                  {colums.map((col) => (
                    <TableHead className="relative" key={col.key}>
                      <Button
                        variant="ghost"
                        className="-ml-4 flex gap-4"
                        onClick={() => handleTableHeaderClick(col)}
                      >
                        {col.name}
                        {col.sort &&
                          pagination.sortField === col.key &&
                          (pagination.sortOrder === Order.ASC ? (
                            <ArrowDownAZ className="size-4" />
                          ) : (
                            <ArrowUpAZ className="size-4" />
                          ))}
                      </Button>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {props?.assignment && (
                  <UserTableRow user={props.assignment.assignedTo} />
                )}
                {data?.data.map((u) => (
                  <UserTableRow key={u.staffCode} user={u} />
                ))}
                {data?.data.length === 0 && !props?.assignment && (
                  <TableRow>
                    <CoreTableCell
                      colSpan={5}
                      className="py-2 text-center text-gray-400"
                    >
                      No users to display.
                    </CoreTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </RadioGroup>
        <DialogFooter>
          <Pagination
            className="justify-center"
            totalPages={data?.pagination.totalPages || 1}
            currentPage={pagination.page}
            onPageChange={(page) => setPagination('page', page)}
          />
        </DialogFooter>
        <DialogFooter className="flex w-full justify-end space-x-4">
          <Button disabled={!staffCode} onClick={onSave}>
            Save
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
