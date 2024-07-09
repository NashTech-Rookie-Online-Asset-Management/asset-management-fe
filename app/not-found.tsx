import Link from 'next/link';

import DynamicLogo from '@/components/custom/dynamic-logo';
import { Button } from '@/components/ui/button';

import PublicHeader from './(public)/components/header';

export const metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 lg:flex-row">
        <DynamicLogo className="size-24 dark:p-1 lg:size-40 lg:dark:p-2" />
        <div className="flex flex-col">
          <h2 className="text-2xl font-black dark:bg-gradient-to-r dark:from-nashblue dark:to-nashred dark:bg-clip-text dark:text-transparent dark:underline dark:decoration-border lg:text-4xl">
            Not Found
          </h2>
          <p className="mb-4">Could not find requested resource</p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
