'use client';

import { RectangleEllipsis, User } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { ModeToggle } from '@/components/custom/mode-toggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useProfile from '@/features/auth/useProfile';

import ChangePasswordDialog from './change-password-dialog';
import LogoutButton from './logout-button';

const navHeadings = [
  {
    path: '/',
    heading: 'Home',
  },
  {
    path: '/assets',
    heading: 'Assets',
  },
  {
    path: '/users',
    heading: 'Users',
  },
  {
    path: '/assignments',
    heading: 'Assignments',
  },
  {
    path: '/returning-requests',
    heading: 'Returning Requests',
  },
];

function AuthHeader() {
  const { data, isPending } = useProfile();
  const [dialogOpen, setDialogOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="w-full bg-primary">
      <div className="container mx-auto flex items-center justify-between py-2">
        <div className="flex items-center space-x-2">
          <Image
            width={110}
            height={110}
            src="/nashtech-logo.png"
            alt="NashTech's Logo"
            className="aspect-square w-12"
          />
          <h1 className="text-xl font-bold text-primary-foreground">
            {navHeadings.find((heading) => heading.path === pathname)
              ?.heading || pathname}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <User className="mr-2 size-4" />
                {isPending ? 'Loading' : data?.username || 'Unauthenticated'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={() => setDialogOpen(true)}>
                <RectangleEllipsis className="mr-2 size-4" />
                <span>Change password</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogoutButton
                  className="m-0 w-full justify-start p-0"
                  variant="ghost"
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </div>
      <ChangePasswordDialog isOpen={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}

export default AuthHeader;
