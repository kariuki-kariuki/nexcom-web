import { useEffect, useState } from 'react';
import { url } from '../data/url';
import getToken from '@/lib/cookies';

interface Iprops<T> {
  isLoading: boolean;
  response: T | null;
  error: any;
}
export function useFetch<T>(resource: string): Iprops<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResult] = useState<T | null>(null);
  const [error, setError] = useState<any>(false);
  useEffect(() => {
    async function fethItems() {
      const token = await getToken();

      try {
        setIsLoading(true);
        fetch(`${url}/${resource}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
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
    }
    fethItems();
  }, [resource]);

  return { isLoading, error, response };
}
