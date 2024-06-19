'use client';

import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { type PropsWithChildren, useState } from 'react';

import { toast } from '@/components/ui/use-toast';

function QueryProvider({ children }: PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      mutationCache: new MutationCache({
        onError(error, _variables, _context, mutation) {
          if (mutation.options.onError) return;

          const title =
            (error as any).response?.data?.error || 'Theres an error occurred';
          const description =
            (error as any).response?.data?.message || (error as any).message;
          toast({
            variant: 'destructive',
            title,
            description,
          });
        },
      }),
    }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default QueryProvider;
