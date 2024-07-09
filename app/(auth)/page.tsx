import MyAssignments from './home/my-assignments';

export const metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <main className="w-full py-8">
      <h3 className="mb-8 text-xl font-bold text-primary">My Assignments</h3>
      <MyAssignments />
    </main>
  );
}
