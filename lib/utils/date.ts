import { format } from 'date-fns';

export function displayDate(date: string) {
  return format(new Date(date), 'dd/MM/yyyy');
}
