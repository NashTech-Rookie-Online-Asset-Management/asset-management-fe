'use client';

import { LogOut, Menu, RectangleEllipsis, User } from 'lucide-react';
import { useState } from 'react';
import { useBoolean, useMediaQuery } from 'usehooks-ts';

import Breadcrumbs from '@/components/custom/breadcrumbs';
import DynamicLogo from '@/components/custom/dynamic-logo';
import { ModeToggle } from '@/components/custom/mode-toggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import type { Account } from '@/features/auth/auth.types';
import useProfile from '@/features/auth/useProfile';
import { cn } from '@/lib/utils';

import ChangePasswordDialog from './change-password-dialog';
import LogoutDialog from './logout-dialog';
import Sidebar from './sidebar';

type Props = {
  initialProfile: Account;
};

function AuthHeader({ initialProfile }: Props) {
  const { data, isPending } = useProfile({
    initialData: initialProfile,
  });
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] =
    useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { value: isMobileAuthBoxOpen, toggle: toggleIsMobileAuthBoxOpen } =
    useBoolean();
  const {
    value: isMobileSheetOpen,
    setValue: setIsMobileSheetOpen,
    toggle: toggleIsMobileSheetOpen,
  } = useBoolean();

  return (
    <div className="w-full">
      <div className="w-full bg-primary">
        <div className="container mx-auto flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            {!isDesktop && (
              <Button
                variant="outline"
                size="icon"
                onClick={toggleIsMobileSheetOpen}
              >
                <Menu />
              </Button>
            )}
            {isDesktop && (
              <>
                <DynamicLogo className="size-12 p-1" />
                <h1 className="text-xl font-bold text-primary-foreground">
                  <Breadcrumbs />
                </h1>
              </>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {isDesktop && (
              <DropdownMenu>
                <DropdownMenuTrigger data-id="header-dropdown" asChild>
                  <Button variant="outline">
                    <User className="mr-2 size-4" />
                    {isPending
                      ? 'Loading'
                      : data?.username || 'Unauthenticated'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem
                    data-id="header-change-password-button"
                    onClick={() => setChangePasswordDialogOpen(true)}
                    className="cursor-pointer"
                  >
                    <RectangleEllipsis className="mr-2 size-4" />
                    <span>Change password</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    data-id="header-logout-button"
                    onClick={() => setLogoutDialogOpen(true)}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 size-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <ModeToggle />
          </div>
        </div>
        {!isDesktop && (
          <div className="container mx-auto flex items-center justify-between pb-2">
            <h1 className="text-sm font-bold text-primary-foreground">
              <Breadcrumbs />
            </h1>
            <Button
              variant={isMobileAuthBoxOpen ? 'outline' : 'ghost'}
              className={cn(
                'px-2 py-1 h-fit font-semibold',
                !isMobileAuthBoxOpen && 'text-primary-foreground',
              )}
              onClick={toggleIsMobileAuthBoxOpen}
            >
              <User className="mr-2 size-4" />
              {isPending ? 'Loading' : data?.username || 'Unauthenticated'}
            </Button>
          </div>
        )}
      </div>
      {!isDesktop && isMobileAuthBoxOpen && (
        <div className="w-full border-t bg-primary">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex w-full flex-col space-y-2 py-2">
              <Button
                className="h-fit w-full justify-start px-0 py-1 text-primary-foreground"
                variant="link"
                onClick={() => setChangePasswordDialogOpen(true)}
              >
                <RectangleEllipsis className="mr-2 size-4" />
                <span>Change password</span>
              </Button>
              <Button
                className="h-fit w-full justify-start px-0 py-1 text-primary-foreground"
                variant="link"
                onClick={() => setLogoutDialogOpen(true)}
              >
                <LogOut className="mr-2 size-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      )}
      <ChangePasswordDialog
        isOpen={changePasswordDialogOpen}
        onOpenChange={setChangePasswordDialogOpen}
      />
      <LogoutDialog
        isOpen={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
      />
      <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
        <SheetContent side="left">
          <Sidebar onNavClick={() => setIsMobileSheetOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AuthHeader;
