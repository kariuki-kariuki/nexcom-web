'use client';

import { useEffect, useState } from 'react';
import { getAuthToken } from '../../utils/token';
import { API_URL } from '../common/constans';

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
    try {
      setIsLoading(true);
      fetch(`${API_URL}/${resource}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
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
  }, [resource]);

  return { isLoading, error, response };
}

export async function create<T>({
  resource,
  formData
}: Props): Promise<T | null> {
  const token = getAuthToken();
  try {
    const res = await fetch(`${API_URL}/${resource}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      return await res.json();
    } // returns true if the deletion was successful, false otherwise
  } catch (error) {
    return null;
  }
  return null;
}

export async function Delete(url: string): Promise<boolean> {
  const token = getAuthToken();
  try {
    const res = await fetch(`${API_URL}/${url}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.ok; // returns true if the deletion was successful, false otherwise
  } catch (error) {
    console.error('Error deleting:', error);
    return false;
  }
}

interface Props {
  resource: string;
  formData: any;
}

export async function update({ resource, formData }: Props) {
  const token = getAuthToken();
  try {
    const res = await fetch(`${API_URL}/${resource}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    return res.ok; // returns true if the deletion was successful, false otherwise
  } catch (error) {
    return false;
  }
}
