'use server';

import { cookies } from 'next/headers';

const getToken = async () => {
  const token = (await cookies()).get('Authentication')?.value;
  return token;
};
export default getToken;
