import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { ModeToggle } from '@/components/custom/mode-toggle';

function PublicHeader() {
  return (
    <div className="w-full bg-primary">
      <div className="container mx-auto flex items-center justify-between py-2">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Image
              width={110}
              height={110}
              src="/nashtech-logo.png"
              alt="NashTech's Logo"
              className="aspect-square w-12"
            />
            <h1 className="text-xl font-bold text-primary-foreground">
              Online Asset Management
            </h1>
          </div>
        </Link>
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default PublicHeader;
