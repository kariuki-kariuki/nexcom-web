'use server';

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { AUTHENTICATION_COOKIE } from "../lib/common/constants";

export async function setToken(token: string) {
  if (token) {
    const cookieStore = await cookies()
    cookieStore.set({
      name: AUTHENTICATION_COOKIE,
      value: token,
      secure: true,
      expires: new Date(jwtDecode(token).exp! * 1000)
    });
  }
}
