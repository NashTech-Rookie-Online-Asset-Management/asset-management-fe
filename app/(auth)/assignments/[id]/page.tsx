'use client';

import { useRouter } from 'next/navigation';

import { TypographyH4 } from '@/components/typos/h4';
import {
  useAssignment,
  useEditAssignment,
} from '@/features/assignment/assignment.hook';

import AssignmentForm from '../components/assignment-form';

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditAssignmentPage({ params }: PageProps) {
  const router = useRouter();
  const { data, isPending: queryPending } = useAssignment(params.id);
  const { mutate, isPending: mutatePending, isSuccess } = useEditAssignment();

  if (isSuccess) router.push('/assignments');

  return (
    <>
      <TypographyH4 className="mb-6 text-primary">Edit Assignment</TypographyH4>
      <AssignmentForm
        isPending={queryPending || mutatePending}
        defaultValue={data}
        onSubmit={(values) =>
          mutate({
            id: params.id,
            data: {
              assetCode: values.asset.assetCode,
              staffCode: values.assignedTo.staffCode,
              assignedDate: values.assignedDate,
              note: values.note,
            },
          })
        }
      />
    </>
  );
}
