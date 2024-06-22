import CreateAssetForm from './form';

export const metadata = {
  title: 'Create New Asset',
};

function CreatePage() {
  return (
    <div className="w-full max-w-xl py-8">
      <h3 className="mb-8 text-xl font-bold text-primary">Create New Asset</h3>
      <CreateAssetForm />
    </div>
  );
}

export default CreatePage;
