import { useMediaQuery } from 'usehooks-ts';

export const useIsDesktop = () => {
  return useMediaQuery('(min-width: 1024px)');
};
