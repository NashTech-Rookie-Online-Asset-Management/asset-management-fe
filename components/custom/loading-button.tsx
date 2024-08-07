import { Loader2 } from 'lucide-react';
import React from 'react';

import { Button, type ButtonProps } from '../ui/button';

export interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingHolder?: React.ReactNode;
}

function LoadingButton({
  isLoading = false,
  loadingHolder = (
    <>
      <Loader2 className="mr-2 size-4 animate-spin" />
      Please wait
    </>
  ),
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? loadingHolder : children}
    </Button>
  );
}

export { LoadingButton };
