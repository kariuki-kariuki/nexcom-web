'use server';

import { AUTHENTICATION_COOKIE } from "@repo/shared-logic";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

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
