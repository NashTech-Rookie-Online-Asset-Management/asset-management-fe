'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import useProfile from '@/features/auth/useProfile';
import { cn } from '@/lib/utils';

const authNavLinks: { title: string; href: string }[] = [
  {
    title: 'Manage User',
    href: '/users',
  },
  {
    title: 'Manage Asset',
    href: '/assets',
  },
  {
    title: 'Manage Assignment',
    href: '/assignments',
  },
  {
    title: 'Request for Returning',
    href: '/returning-requests',
  },
  {
    title: 'Report',
    href: '/report',
  },
];

const NavLink = ({
  href,
  title,
  className,
  key,
}: (typeof authNavLinks)[0] & {
  className: string;
  key?: React.Key;
}) => {
  return (
    <Link href={href} className="font-bold" key={key}>
      <li className={cn(`py-2 px-4`, className)}>{title}</li>
    </Link>
  );
};

const Sidebar = () => {
  const { data: user } = useProfile();
  const currentPath = usePathname();

  const isActive = (path: any) =>
    currentPath === path
      ? 'bg-red-600 text-white hover:bg-red-700'
      : 'bg-gray-100 text-black hover:bg-gray-200';

  return (
    <nav className="mt-10 w-64">
      <div className=" mb-6">
        <Image src="/nashtech-logo.png" alt="Logo" width={110} height={110} />
        <h4 className="text-lg font-bold text-red-500">
          Online Asset Management
        </h4>
      </div>
      <ul className="space-y-2">
        <NavLink href="/" title="Home" className={isActive('/')} />
        {user?.type !== 'STAFF' &&
          authNavLinks.map((link) => (
            <NavLink
              {...link}
              className={isActive(link.href)}
              key={link.href}
            />
          ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
