import ChangePasswordFirstTimeDialog from './components/change-password-first-time-dialog';
import ShowUserData from './components/show-user-data';

export const metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <main>
      <p>Online Asset Management</p>
      <ShowUserData />
      <ChangePasswordFirstTimeDialog />
    </main>
  );
}
