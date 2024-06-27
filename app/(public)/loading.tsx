import { LoaderCircle } from 'lucide-react';
import React from 'react';

function Loading() {
  return (
    <div className="flex min-h-96 w-full items-center justify-center">
      <LoaderCircle className="size-8 animate-spin" />
    </div>
  );
}

export default Loading;
