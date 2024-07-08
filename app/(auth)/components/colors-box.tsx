import React from 'react';

import { cn } from '@/lib/utils';

type Props = {
  texts: Record<string, string>;
  colors: Record<string, string>;
};

export const ColorsBox = ({
  texts,
  colors,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & Props) => {
  return (
    <div className={cn('flex flex-wrap gap-2', className)} {...props}>
      {Object.entries(colors).map(([key, value]) => (
        <div key={key} className="flex space-x-1 text-xs">
          <div className={`aspect-square size-4 rounded-full ${value}`} />
          <span>{texts[key as keyof typeof texts]}</span>
        </div>
      ))}
    </div>
  );
};
