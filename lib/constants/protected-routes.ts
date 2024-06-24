import { AccountType } from '../@types/api';

export type ProtectedRoute = {
  path: string;
  title: string;
  heading: string;
  accountTypes: AccountType[];
};

export const PROTECTED_ROUTES: ProtectedRoute[] = [
  {
    path: '/users',
    title: 'Manage User',
    heading: 'Users',
    accountTypes: [AccountType.ADMIN],
  },
  {
    path: '/assets',
    title: 'Manage Asset',
    heading: 'Assets',
    accountTypes: [AccountType.ADMIN],
  },
  {
    path: '/assignments',
    title: 'Manage Assignment',
    heading: 'Assignments',
    accountTypes: [AccountType.ADMIN],
  },
  {
    path: '/returning-requests',
    title: 'Request for Returning',
    heading: 'Returning Requests',
    accountTypes: [AccountType.ADMIN],
  },
  {
    path: '/report',
    title: 'Report',
    heading: 'Report',
    accountTypes: [AccountType.ADMIN],
  },
  {
    path: '/',
    title: 'Home',
    heading: 'Home',
    accountTypes: [AccountType.ADMIN, AccountType.STAFF],
  },
];
