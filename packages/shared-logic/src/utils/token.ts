'use client';

import Cookies from 'js-cookie';

export const getAuthToken = () => {
  const token = Cookies.get('Authentication');
  return token;
};
