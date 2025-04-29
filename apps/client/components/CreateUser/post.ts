'use server';

import { redirect } from 'next/navigation';
import { getErrorMessage } from '../../utils/errors';
import { API_URL } from '../../lib/common/constans';
import { getToken } from '../../utils/fetch';

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
