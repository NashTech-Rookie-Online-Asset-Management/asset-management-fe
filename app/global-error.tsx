'use client';

import { useEffect } from 'react';

import DynamicLogo from '@/components/custom/dynamic-logo';
import { Button } from '@/components/ui/button';

import PublicHeader from './(public)/components/header';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 md:flex-row">
        <DynamicLogo className="size-24 dark:p-1 md:size-40 md:dark:p-2" />
        <div className="flex flex-col">
          <h2 className="mb-4 text-2xl font-black dark:bg-gradient-to-r dark:from-nashblue dark:to-nashred dark:bg-clip-text dark:text-transparent dark:underline dark:decoration-border md:text-4xl">
            Something went wrong!
          </h2>
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </div>
    </div>
  );
}
