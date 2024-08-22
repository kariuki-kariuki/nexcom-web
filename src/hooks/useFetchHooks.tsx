import { useEffect, useState } from 'react';

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
      fetch(`http://localhost:3000/${resource}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setResult(result);
          setIsLoading(false);
          console.log(result);
        })
        .catch((e) => {
          setError(e);
          setIsLoading(false);
        }); // server respone error
    } catch (e) {
      // newtwork error
      setError(e);
      setIsLoading(false);
    }
  }, [token, resource]);

  return { isLoading, error, result };
}
