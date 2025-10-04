import React from 'react';
import { redirect } from 'next/navigation';
import { GlobalUser } from '@repo/nexcom-types';
import { get } from '@repo/shared-logic';
import { Follow } from '@/components/AllUsers/Follow';

async function Page() {
  const users = await get<GlobalUser[]>('users');
  if (!users) redirect('/products');
  return (
    <div>
      <Follow dbusers={users} />
    </div>
  );
}

export default Page;
