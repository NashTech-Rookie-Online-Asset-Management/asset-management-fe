import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export function TypographyH5({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-lg font-semibold tracking-tight',
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  );
}
