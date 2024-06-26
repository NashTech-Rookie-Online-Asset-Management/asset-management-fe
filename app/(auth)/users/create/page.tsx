import CreateUserForm from './form';

export const metadata = {
  title: 'Create User | OAM',
};

export default function CreateUserPage() {
  return (
    <div className="w-full max-w-xl py-8">
      <h3 className="mb-8 text-xl font-bold text-primary">Create New User</h3>
      <CreateUserForm />
    </div>
  );
}
