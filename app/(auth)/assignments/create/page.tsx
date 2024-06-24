import { TypographyH4 } from '@/components/typos/h4';

import AssignmentForm from '../components/assignment-form';

export default function CreateAssignmentPage() {
  return (
    <>
      <TypographyH4 className="mb-6 text-primary">
        Create Assignment
      </TypographyH4>

      <AssignmentForm />
    </>
  );
}
