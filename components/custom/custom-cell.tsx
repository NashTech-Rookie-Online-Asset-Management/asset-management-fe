import { TableCell } from '../ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export const CustomCell = ({ value }: { value: string }) => {
  return (
    <TableCell className="py-2 pl-8">
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="truncate">{value}</p>
        </TooltipTrigger>
        <TooltipContent>{value}</TooltipContent>
      </Tooltip>
    </TableCell>
  );
};
