import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay: number = 300, callback?: () => void) {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
      if (callback) {
        callback();
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay, callback]);

  return debounceValue;
}

export default useDebounce;
