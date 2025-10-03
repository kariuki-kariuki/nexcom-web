'use server';

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { AUTHENTICATION_COOKIE } from "../lib/common/constans";

export default async function setToken(token: string) {
  setAuthCookie(token);
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