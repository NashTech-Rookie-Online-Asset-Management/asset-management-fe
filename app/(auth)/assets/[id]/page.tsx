import React from 'react';

import EditAssetForm from './form';

export const metadata = {
  title: 'Edit Asset',
};

function EditAssetPage({ params }: { params: { id: string } }) {
  return (
    <div className="w-full max-w-xl py-8">
      <h3 className="mb-8 text-xl font-bold text-primary">Edit Asset</h3>
      <EditAssetForm id={params.id} />
    </div>
  );
}

export default EditAssetPage;
