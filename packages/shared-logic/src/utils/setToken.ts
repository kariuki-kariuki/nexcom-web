'use server';

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { AUTHENTICATION_COOKIE, DOMAIN_URL } from "../lib/common/constants";

export async function setToken(token: string) {
  if (token) {
    const cookieStore = await cookies()
    cookieStore.set({
      name: AUTHENTICATION_COOKIE,
      value: token,
      secure: true,
      domain: DOMAIN_URL,
      expires: new Date(jwtDecode(token).exp! * 1000)
    });
  }
}
