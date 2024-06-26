import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Location } from './@types/api';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
}

export function normalizeText(data: string): string {
  return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
}

export function getLocationText(location: Location): string {
  switch (location) {
    case Location.HCM:
      return 'Ho Chi Minh';
    case Location.DN:
      return 'Da Nang';
    case Location.HN:
      return 'Ha Noi';
    default:
      return '';
  }
}
