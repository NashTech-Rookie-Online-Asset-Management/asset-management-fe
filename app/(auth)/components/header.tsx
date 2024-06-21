'use client';

import { LogOut, RectangleEllipsis, User } from 'lucide-react';
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

import NashTechLogo from '@/components/custom/nashtech-logo';
import ChangePasswordDialog from './change-password-dialog';
import LogoutDialog from './logout-dialog';

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
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] =
    useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="w-full bg-primary">
      <div className="container mx-auto flex items-center justify-between py-2">
        <div className="flex items-center space-x-2">
          <div className="aspect-square bg-white p-1 size-12">
            <NashTechLogo className="w-full h-full" />
          </div>
          <h1 className="text-xl font-bold text-primary-foreground">
            {navHeadings.find((heading) => heading.path === pathname)
              ?.heading || 'OAM'}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger data-id="header-dropdown" asChild>
              <Button variant="outline">
                <User className="mr-2 size-4" />
                {isPending ? 'Loading' : data?.username || 'Unauthenticated'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem
                data-id="header-change-password-button"
                onClick={() => setChangePasswordDialogOpen(true)}
              >
                <RectangleEllipsis className="mr-2 size-4" />
                <span>Change password</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                data-id="header-logout-button"
                onClick={() => setLogoutDialogOpen(true)}
              >
                <LogOut className="mr-2 size-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </div>
      <ChangePasswordDialog
        isOpen={changePasswordDialogOpen}
        onOpenChange={setChangePasswordDialogOpen}
      />
      <LogoutDialog
        isOpen={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
      />
    </div>
  );
}

export default AuthHeader;
