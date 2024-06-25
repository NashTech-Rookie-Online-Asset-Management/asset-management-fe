import { AccountType } from '../@types/api';

export type ProtectedRoute = {
  path: string;
  title: string;
  heading: string;
  accountTypes: AccountType[];
  order: number;
};

export const PROTECTED_ROUTES: readonly ProtectedRoute[] = [
  {
    path: '/users',
    title: 'Manage User',
    heading: 'Users',
    accountTypes: [AccountType.ROOT, AccountType.ADMIN],
    order: 1,
  },
  {
    path: '/assets',
    title: 'Manage Asset',
    heading: 'Assets',
    accountTypes: [AccountType.ADMIN],
    order: 2,
  },
  {
    path: '/assignments',
    title: 'Manage Assignment',
    heading: 'Assignments',
    accountTypes: [AccountType.ADMIN],
    order: 3,
  },
  {
    path: '/returning-requests',
    title: 'Request for Returning',
    heading: 'Returning Requests',
    accountTypes: [AccountType.ADMIN],
    order: 4,
  },
  {
    path: '/report',
    title: 'Report',
    heading: 'Report',
    accountTypes: [AccountType.ADMIN],
    order: 5,
  },
  {
    path: '/',
    title: 'Home',
    heading: 'Home',
    accountTypes: [AccountType.ADMIN, AccountType.STAFF],
    order: 0,
  },
] as const;
