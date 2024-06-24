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
import { useAvailableAsset } from '@/features/assignment/assignment.hook';
import type assignmentService from '@/features/assignment/assignment.service';
import useFilter from '@/lib/hooks/useFilter';
import type { ReturnArrayPromise } from '@/lib/utilities';

import type { ModalProps } from './base-modal';
import { TableCell } from './base-modal';

type Asset = ReturnArrayPromise<typeof assignmentService.getAvailableAsset>;
const filterFn = (asset: Asset, filterValue: string) =>
  asset.name.toLowerCase().includes(filterValue) ||
  asset.assetCode.toLowerCase().includes(filterValue);

export default function SelectAssetModal(props: ModalProps) {
  const { data } = useAvailableAsset();
  const [asset, setAsset] = useState('');
  const { filterData, setFilter, filter } = useFilter<Asset>(data, filterFn);

  const onSave = () => {
    props.onSelect(asset);
    props.setOpen(false);
  };

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent hideCloseButton className="max-w-3xl py-3">
        <DialogHeader className="flex flex-row items-center justify-between">
          <TypographyH5 className="text-primary">Select Asset</TypographyH5>
          <div className="relative w-5/12">
            <Input
              defaultValue={filter}
              placeholder="Finding assets..."
              className="placeholder:text-slate-400"
              onChange={(e) => setFilter(e.target.value)}
            />
            <Search className="absolute right-0 top-0 m-2.5 size-4 cursor-pointer text-muted-foreground transition-colors hover:text-primary" />
          </div>
        </DialogHeader>
        <RadioGroup value={asset} onValueChange={(value) => setAsset(value)}>
          <div className="relative max-h-[60vh] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-background">
                <TableRow>
                  <TableHead />
                  <TableHead>Asset Code</TableHead>
                  <TableHead>Asset Name</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filterData.map(({ assetCode, name, category }) => (
                  <TableRow key={assetCode}>
                    <TableCell htmlFor={assetCode}>
                      <RadioGroupItem id={assetCode} value={assetCode} />
                    </TableCell>
                    <TableCell htmlFor={assetCode}>{assetCode}</TableCell>
                    <TableCell htmlFor={assetCode}>{name}</TableCell>
                    <TableCell htmlFor={assetCode}>{category.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </RadioGroup>
        <DialogFooter className="flex w-full justify-end space-x-4">
          <Button disabled={!asset} onClick={onSave}>
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
