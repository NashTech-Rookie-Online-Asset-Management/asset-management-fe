import React from 'react';

type Props = {};

export const metadata = {
  title: 'Requests for Returning',
};

function ReturningRequestLayout({ children }: React.PropsWithChildren<Props>) {
  return <div>{children}</div>;
}

export default ReturningRequestLayout;
