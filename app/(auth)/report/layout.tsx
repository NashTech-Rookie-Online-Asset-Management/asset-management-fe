import React from 'react';

type Props = {};

export const metadata = {
  title: 'Report',
};

function ReportLayout({ children }: React.PropsWithChildren<Props>) {
  return (
    <main className="w-full py-8">
      <h3 className="mb-8 text-xl font-bold text-primary">Report</h3>
      {children}
    </main>
  );
}

export default ReportLayout;
