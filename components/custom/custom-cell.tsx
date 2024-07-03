import { cn } from '@/lib/utils';

import { TableCell } from '../ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type Props = {
  className?: string;
  value?: string;
  disableTooltip?: boolean;
};

export const CustomCell = ({
  value,
  children,
  className,
  disableTooltip = false,
}: React.PropsWithChildren<Props>) => {
  return (
    <TableCell className={cn('py-2 pl-8', className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children || <p className="truncate">{value}</p>}
        </TooltipTrigger>
        {!disableTooltip && (
          <TooltipContent>{children || value}</TooltipContent>
        )}
      </Tooltip>
    </TableCell>
  );
};
