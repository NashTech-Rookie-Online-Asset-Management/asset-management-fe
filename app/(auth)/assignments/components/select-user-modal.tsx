import { ArrowDownAZ, ArrowUpAZ, Search } from 'lucide-react';
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
import type { AvailableUser } from '@/features/assignment/assignment.type';
import { Order } from '@/lib/@types/api';
import { AccountTypeOptions } from '@/lib/constants/user';

import type { ModalProps, TableCol } from './base-modal';
import { TableCell, usePaginate } from './base-modal';

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
    sort: false,
  },
];

export default function SelectUserModal(props: ModalProps<AvailableUser>) {
  const [staffCode, setStaffCode] = useState(props.defaultValue);
  const { pagination, setPagination } = usePaginate(5, 300, 'fullName');

  const { data } = useAvailableUser(pagination);

  const onSave = () => {
    const user =
      data && data.data.find((userTmp) => userTmp.staffCode === staffCode);
    if (user) {
      props.onSelect(user);
      props.setOpen(false);
    }
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

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
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
          value={staffCode}
          onValueChange={(value) => setStaffCode(value)}
        >
          <div className="relative max-h-[60vh] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-background">
                <TableRow>
                  <TableHead />
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
                {data?.data.map((u) => (
                  <TableRow key={u.staffCode}>
                    <TableCell htmlFor={u.staffCode}>
                      <RadioGroupItem value={u.staffCode} id={u.staffCode} />
                    </TableCell>
                    <TableCell htmlFor={u.staffCode}>{u.staffCode}</TableCell>
                    <TableCell htmlFor={u.staffCode}>
                      {u.firstName} {u.lastName}
                    </TableCell>
                    <TableCell htmlFor={u.staffCode}>
                      {AccountTypeOptions[u.type]}
                    </TableCell>
                  </TableRow>
                ))}
                {data?.data.length === 0 && (
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
          <Button variant="outline" onClick={() => props.setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
