import { useEffect, useState } from 'react';
import { url } from '../data/url';

interface Iprops<T> {
  isLoading: boolean;
  result: T | null;
  error: any;
}
export function useFetch<T>(resource: string): Iprops<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<T | null>(null);
  const token = localStorage.getItem('token');
  const [error, setError] = useState<any>(false);
  useEffect(() => {
    try {
      setIsLoading(true);
      fetch(`${url}/${resource}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.ok) {
          res.json().then((r) => setResult(r));
          setIsLoading(false);
        } else {
          setError('Failed to fecth');
          setIsLoading(false);
        }
      });
    } catch (e) {
      // newtwork error
      setError(e);
      setIsLoading(false);
    }
  }, [token, resource]);

  return { isLoading, error, result };
}
