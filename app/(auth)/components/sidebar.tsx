'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';
import useProfile from '@/features/auth/useProfile';

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
  isActive = false,
}: (typeof authNavLinks)[0] & {
  isActive?: boolean;
}) => {
  return (
    <Button
      asChild
      variant={isActive ? 'default' : 'secondary'}
      className="w-full justify-start rounded-none font-bold"
    >
      <Link href={href}>
        <li>{title}</li>
      </Link>
    </Button>
  );
};

const Sidebar = () => {
  const { data: user } = useProfile();
  const currentPath = usePathname();

  const isActive = (path: any) => currentPath === path;

  return (
    <nav className="mt-10 w-64">
      <div className="mb-6">
        <Image src="/nashtech-logo.png" alt="Logo" width={110} height={110} />
        <h4 className="text-lg font-bold text-primary">
          Online Asset Management
        </h4>
      </div>
      <ul>
        <NavLink href="/" title="Home" isActive={isActive('/')} />
        {user &&
          user.type !== 'STAFF' &&
          authNavLinks.map((link) => (
            <NavLink {...link} isActive={isActive(link.href)} key={link.href} />
          ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
