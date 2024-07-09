'use client';

import { useIsClient } from 'usehooks-ts';

import Loading from '../loading';

type Props = {};

export default function ClientReady({
  children,
}: React.PropsWithChildren<Props>) {
  const isClient = useIsClient();

  return isClient ? children : <Loading />;
}
