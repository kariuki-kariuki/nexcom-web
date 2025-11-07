'use server';

import { API_URL, AUTHENTICATION_COOKIE } from '@repo/shared-logic';
import { cookies } from 'next/headers';

export const getToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTHENTICATION_COOKIE)?.value;
  return token;
};

export default async function get<T>(route: string): Promise<T | null> {
  const token = await getToken();
  try {
    const res = await fetch(`${API_URL}/${route}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) {
      res.json().then((r) => {
        console.log(r.message);
      });
      return null;
    }
    return res.json();
  } catch (e) {
    console.log(e);
    return null;
  }
}
