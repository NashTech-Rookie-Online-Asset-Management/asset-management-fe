import { Label } from '@/components/ui/label';
import { TableCell as CoreTableCell } from '@/components/ui/table';

export interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSelect: (user: string) => void;
}

interface TabaleCellProps {
  htmlFor: string;
}
export function TableCell(props: React.PropsWithChildren<TabaleCellProps>) {
  return (
    <CoreTableCell className="p-0">
      <Label
        htmlFor={props.htmlFor}
        className="inline-flex w-full cursor-pointer p-4 font-normal"
      >
        {props.children}
      </Label>
    </CoreTableCell>
  );
}
