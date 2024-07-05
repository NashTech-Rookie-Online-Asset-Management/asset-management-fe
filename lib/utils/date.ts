import { format, lightFormat } from 'date-fns';

export function displayDate(date: string) {
  return format(new Date(date), 'dd/MM/yyyy');
}

export function inputDateConvert(date: Date | string) {
  if (!date) return '';
  return lightFormat(new Date(date), 'yyyy-MM-dd');
}
