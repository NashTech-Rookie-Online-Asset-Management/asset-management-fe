'use client';

import React from 'react';

import EditUserForm from './edit-user-form';

type Props = {
  params: { id: string };
};
function EditUSerPage({ params }: Props) {
  return (
    <div className="w-full max-w-xl py-8">
      <h3 className="mb-8 text-xl font-bold text-primary">Edit New User</h3>
      <EditUserForm id={params.id} />
    </div>
  );
}

export default EditUSerPage;
