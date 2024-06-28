'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

type Props = {
  breadClassName?: string;
  className?: string;
  separator?: React.ReactNode;
};

type Breadcrumb = {
  title: string;
  path: string;
};

const paths: Breadcrumb[] = [
  {
    title: 'Manage Asset',
    path: '/assets',
  },
  {
    title: 'Create New Asset',
    path: '/assets/create',
  },
  {
    title: 'Edit Asset',
    path: '/assets/[id]',
  },
  {
    title: 'Manage User',
    path: '/users',
  },
  {
    title: 'Create New User',
    path: '/users/create',
  },
  {
    title: 'Edit User',
    path: '/users/[id]',
  },
  {
    title: 'Manage Assignment',
    path: '/assignments',
  },
  {
    title: 'Create New Assignment',
    path: '/assignments/create',
  },
  {
    title: 'Edit Assignment',
    path: '/assignments/[id]',
  },
  {
    title: 'Request for Returning',
    path: '/returning-requests',
  },
  {
    title: 'Report',
    path: '/report',
  },
];

function Breadcrumbs({
  className,
  breadClassName,
  separator = (
    <span className="px-2">
      <ChevronRight />
    </span>
  ),
}: Props) {
  const pathname = usePathname();

  const breadcrumbs = pathname
    .split('/')
    .filter((p) => p !== '')
    .map((p, i, array) => {
      const path = `/${array.slice(0, i + 1).join('/')}`.replace(/\[\w+\]/, '');
      const title = paths?.find((b) => {
        return b.path.includes('[id]')
          ? path.match(new RegExp(b.path.replaceAll('[id]', '([a-zA-Z0-9]+)')))
          : b.path === path;
      })?.title;

      return {
        path,
        title,
      };
    });

  return (
    <div className={cn('flex items-center', className)}>
      {breadcrumbs.length > 0 ? (
        breadcrumbs.map((b, i) => (
          <React.Fragment key={b.path}>
            {i > 0 && separator}
            <Link href={b.path} className={cn(breadClassName)}>
              {b.title}
            </Link>
          </React.Fragment>
        ))
      ) : (
        <Link href="/" className={cn(breadClassName)}>
          Home
        </Link>
      )}
    </div>
  );
}

export default Breadcrumbs;
