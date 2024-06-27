import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import assignmentApi from '@/features/assignment/assignment.service';
import CookieKeys from '@/lib/constants/cookieKeys';

import EditAssignmentForm from './form';

type Props = {
  params: {
    id: string;
  };
}

async function getAssignment(id: string) {
  const accessToken = cookies().get(CookieKeys.ACCESS_TOKEN)?.value!;
  assignmentApi.setBearerToken(accessToken).useServer();

  try {
    const assignment = await assignmentApi.get(id);
    return assignment;
  } catch (error) {
    return redirect('/assignments');
  }
}

export default async function EditAssignmentPage({ params }: Props) {
  await getAssignment(params.id);

  return <EditAssignmentForm id={params.id} />;
}
