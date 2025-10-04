'use server';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { getErrorMessage } from '../../utils/errors';
import { API_URL, AUTHENTICATION_COOKIE } from '../../lib/common/constans';
import { datasource } from './datasource';


interface FormResponse {
  error?: string;
  name?: string,
  id?: number,
}
export default async function PostSrr(
  prevState: FormResponse,
  formData: FormData
) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${datasource.getJwtToken()}` },

    body: JSON.stringify(Object.fromEntries(formData))
  });

  const parsedResponse = await response.json();

  if (!response.ok) {
    return { error: getErrorMessage(parsedResponse) };
  }

  setAuthCookie(parsedResponse.token);
  return { error: '', name: parsedResponse.name, id: parsedResponse.id };
}

const setAuthCookie = async (token: string) => {
  if (token) {
    (await cookies()).set({
      name: AUTHENTICATION_COOKIE,
      value: token,
      secure: true,
      expires: new Date(jwtDecode(token).exp! * 1000)
    });
  }
};
