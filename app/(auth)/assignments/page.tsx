'use client';

import { useAssignments } from '@/features/assignment/assignment.hook';

export default function ListAssignmentPage() {
  const { data } = useAssignments();

  return <h1>{JSON.stringify(data?.map((assignment) => assignment.id))}</h1>;
}
