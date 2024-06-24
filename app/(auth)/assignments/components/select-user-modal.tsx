import { Search } from 'lucide-react';
import { useState } from 'react';

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
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAvailableUser } from '@/features/assignment/assignment.hook';
import type assignmentService from '@/features/assignment/assignment.service';
import useFilter from '@/lib/hooks/useFilter';
import type { ReturnArrayPromise } from '@/lib/utilities';

import type { ModalProps } from './base-modal';
import { TableCell } from './base-modal';

type User = ReturnArrayPromise<typeof assignmentService.getAvailableUser>;
const filterFn = (user: User, filterValue: string) =>
  user.staffCode.toLowerCase().includes(filterValue) ||
  user.firstName.toLowerCase().includes(filterValue) ||
  user.lastName.toLowerCase().includes(filterValue);

export default function SelectUserModal(props: ModalProps) {
  const { data } = useAvailableUser();
  const [user, setUser] = useState('');
  const { setFilter, filterData, filter } = useFilter<User>(data, filterFn);

  const onSave = () => {
    props.onSelect(user);
    props.setOpen(false);
  };

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent hideCloseButton className="max-w-3xl py-3">
        <DialogHeader className="flex flex-row items-center justify-between">
          <TypographyH5 className="text-primary">Select User</TypographyH5>
          <div className="relative w-5/12">
            <Input
              defaultValue={filter}
              placeholder="Finding users..."
              className="placeholder:text-slate-400"
              onChange={(e) => setFilter(e.target.value)}
            />
            <Search className="absolute right-0 top-0 m-2.5 size-4 cursor-pointer text-muted-foreground transition-colors hover:text-primary" />
          </div>
        </DialogHeader>
        <RadioGroup value={user} onValueChange={(value) => setUser(value)}>
          <div className="relative max-h-[60vh] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-background">
                <TableRow>
                  <TableHead />
                  <TableHead>Staff Code</TableHead>
                  <TableHead>Fullname</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filterData.map(({ staffCode, firstName, lastName, type }) => (
                  <TableRow key={staffCode}>
                    <TableCell htmlFor={staffCode}>
                      <RadioGroupItem value={staffCode} id={staffCode} />
                    </TableCell>
                    <TableCell htmlFor={staffCode}>{staffCode}</TableCell>
                    <TableCell htmlFor={staffCode}>
                      {firstName} {lastName}
                    </TableCell>
                    <TableCell htmlFor={staffCode}>{type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </RadioGroup>
        <DialogFooter className="flex w-full justify-end space-x-4">
          <Button disabled={!user} onClick={onSave}>
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
