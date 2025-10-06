import Login from '@/components/Login/Login';
import React from 'react';

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>
}) {
  const redirect = await searchParams
  return <Login searchParams={redirect.redirect || ""} />;
}

export default Page;
