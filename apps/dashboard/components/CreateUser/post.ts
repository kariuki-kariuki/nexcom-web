'use server';

import { API_URL, getErrorMessage, getToken } from '@repo/shared-logic';
import { redirect } from 'next/navigation';

interface FormError {
  error: string;
}
export default async function post(prevState: FormError, formData: FormData) {
  const token = await getToken();
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(Object.fromEntries(formData))
  });

  const parsedResponse = await response.json();

  if (!response.ok) {
    return { error: getErrorMessage(parsedResponse) };
  }

  return redirect('/users');
}
