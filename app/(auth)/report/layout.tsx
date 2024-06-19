import React from 'react';

type Props = {};

export const metadata = {
  title: 'Report',
};

function ReportLayout({ children }: React.PropsWithChildren<Props>) {
  return <div>{children}</div>;
}

export default ReportLayout;
