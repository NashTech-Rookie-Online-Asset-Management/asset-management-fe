'use client';

import { useRouter } from 'next/navigation';

import { TypographyH4 } from '@/components/typos/h4';
import {
  useAssignment,
  useEditAssignment,
} from '@/features/assignment/assignment.hook';

import AssignmentForm from '../components/assignment-form';

interface Props {
  id: string;
}

export default function EditAssignmentForm({ id }: Props) {
  const router = useRouter();
  const { data, isPending: queryPending } = useAssignment(id);
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
            id,
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
