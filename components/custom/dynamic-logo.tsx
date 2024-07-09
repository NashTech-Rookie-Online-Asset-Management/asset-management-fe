import React from 'react';

import { cn } from '@/lib/utils';

import NashTechLogo from './nashtech-logo';

type Props = {
  className?: string;
};

function DynamicLogo({
  children = <NashTechLogo className="size-full dark:fill-white" />,
  className,
}: React.PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        'aspect-square bg-white dark:bg-gradient-to-r dark:from-nashblue dark:to-nashred',
        className,
      )}
    >
      {children}
    </div>
  );
}

export default DynamicLogo;
