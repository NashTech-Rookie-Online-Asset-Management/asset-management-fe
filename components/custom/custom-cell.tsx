import { cn } from '@/lib/utils';

import { TableCell } from '../ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type CustomCellProps = {
  value: string | number;
  className?: string;
};

export const CustomCell = ({ value, className }: CustomCellProps) => {
  return (
    <TableCell className={cn('py-2 pl-8', className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="truncate">{value}</p>
        </TooltipTrigger>
        <TooltipContent>{value}</TooltipContent>
      </Tooltip>
    </TableCell>
  );
};
