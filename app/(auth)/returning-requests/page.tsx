import ReturningRequestList from './table';

export const metadata = {
  title: 'Home',
};

export default function ReturningRequestsPage() {
  return (
    <main className="w-full py-8">
      <h3 className="mb-8 text-xl font-bold text-primary">Request List</h3>
      <ReturningRequestList />
    </main>
  );
}
