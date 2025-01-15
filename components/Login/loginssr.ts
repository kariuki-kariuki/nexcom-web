'use server';

import { jwtDecode } from 'jwt-decode';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getErrorMessage } from '../../utils/errors';
import { API_URL, AUTHENTICATION_COOKIE } from '../../lib/common/constans';

interface FormError {
  error: string;
}
export default async function loginSSR(
  prevState: FormError,
  formData: FormData
) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.fromEntries(formData))
  });

  const parsedResponse = await response.json();

  if (!response.ok) {
    return { error: getErrorMessage(parsedResponse) };
  }

  setAuthCookie(parsedResponse.token);
  return redirect('/products');
}

const setAuthCookie = (token: string) => {
  if (token) {
    cookies().set({
      name: AUTHENTICATION_COOKIE,
      value: token,
      secure: true,
      expires: new Date(jwtDecode(token).exp! * 1000)
    });
  }
};
