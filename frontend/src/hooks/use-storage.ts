import { useState, useEffect, useCallback } from 'react';
import Storage from '@/lib/storage';

/**
 * Custom hook to replace Spark's useKV hook
 * Provides React state management with localStorage persistence
 */
export function useStorage<T>(key: string, initialValue?: T) {
  const [value, setValue] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load initial value from storage
  useEffect(() => {
    const loadValue = async () => {
      try {
        setLoading(true);
        const storedValue = await Storage.get<T>(key);
        setValue(storedValue ?? (initialValue ?? null));
      } catch (err) {
        setError(err as Error);
        setValue(initialValue ?? null);
      } finally {
        setLoading(false);
      }
    };

    loadValue();
  }, [key, initialValue]);

  // Update value in storage
  const updateValue = useCallback(
    async (newValue: T | null) => {
      try {
        setError(null);
        if (newValue === null) {
          await Storage.delete(key);
        } else {
          await Storage.set(key, newValue);
        }
        setValue(newValue);
      } catch (err) {
        setError(err as Error);
        throw err;
      }
    },
    [key]
  );

  // Delete value from storage
  const deleteValue = useCallback(async () => {
    try {
      setError(null);
      await Storage.delete(key);
      setValue(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [key]);

  return {
    value,
    setValue: updateValue,
    deleteValue,
    loading,
    error,
  };
}

export default useStorage;
