import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(key) || initialValue;
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
