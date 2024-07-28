import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    return window.localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [key, value]);

  useEffect(() => {
    return () => {
      window.localStorage.setItem(key, value);
    };
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
