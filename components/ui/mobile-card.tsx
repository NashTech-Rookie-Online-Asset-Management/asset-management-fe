import React from 'react';

import { cn } from '@/lib/utils';

const MobileCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    direction?: 'row' | 'column';
    hideAction?: boolean;
  }
>(({ direction = 'row', hideAction = false, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex min-h-32 w-full border rounded bg-card text-card-foreground',
      !hideAction && 'relative',
      direction === 'row' ? 'flex-row' : 'flex-col',
      className,
    )}
    {...props}
  />
));
MobileCard.displayName = 'MobileCard';

const MobileCardActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-role="action"
    className={cn('absolute right-0 top-0 m-2', className)}
    {...props}
  />
));
MobileCardActions.displayName = 'MobileCardActions';

const MobileCardStatus = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { color: string }
>(({ className, color, ...props }, ref) => (
  <div ref={ref} className={cn('w-2 rounded-l', color, className)} {...props} />
));
MobileCardStatus.displayName = 'MobileCardStatus';

const MobileCardContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex-1 flex flex-col px-2 py-1', className)}
    {...props}
  />
));
MobileCardContainer.displayName = 'MobileCardContainer';

const MobileCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('font-bold text-medium', className)}
    {...props}
  />
));
MobileCardHeader.displayName = 'MobileCardHeader';

const MobileCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm text-medium', className)} {...props} />
));
MobileCardContent.displayName = 'MobileCardContent';

const MobileCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
));
MobileCardFooter.displayName = 'MobileCardFooter';

export {
  MobileCard,
  MobileCardActions,
  MobileCardContainer,
  MobileCardContent,
  MobileCardFooter,
  MobileCardHeader,
  MobileCardStatus,
};
