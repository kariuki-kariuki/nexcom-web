'use server';

import { AUTHENTICATION_COOKIE } from "@/lib/common/constans";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export default async function setToken(token: string) {
  setAuthCookie(token);
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