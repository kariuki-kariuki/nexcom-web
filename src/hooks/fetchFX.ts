import { url } from '../data/url';

interface Iprops<T> {
  isLoading: boolean;
  result: T | null;
  error: any;
}

export async function fetchFX<T>(resource: string): Promise<Iprops<T>> {
  const token = localStorage.getItem('token');
  const initialResponse: Iprops<T> = {
    isLoading: true,
    result: null,
    error: null
  };

  try {
    const response = await fetch(`${url}/${resource}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return { ...initialResponse, isLoading: false, result: data };
    } else {
      return { ...initialResponse, isLoading: false, error: 'Failed to fetch' };
    }
  } catch (e) {
    return { ...initialResponse, isLoading: false, error: e };
  }
}

interface IPostProps<X> {
  resource: string;
  method: string;
  body: X;
}
export async function PostFecthFX<T, X>({
  resource,
  method,
  body
}: IPostProps<X>): Promise<Iprops<T>> {
  const token = localStorage.getItem('token');
  const initialResponse: Iprops<T> = {
    isLoading: true,
    result: null,
    error: null
  };

  try {
    const response = await fetch(`${url}/${resource}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method,
      body: JSON.stringify(body)
    });

    if (response.ok) {
      const data = await response.json();
      return { ...initialResponse, isLoading: false, result: data };
    } else {
      return { ...initialResponse, isLoading: false, error: 'Failed to fetch' };
    }
  } catch (e) {
    return { ...initialResponse, isLoading: false, error: e };
  }
}
