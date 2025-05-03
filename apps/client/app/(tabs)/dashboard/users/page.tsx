import React from 'react';
import { redirect } from 'next/navigation';
import { GlobalUser } from '../../../../lib/@types/app';
import get from '../../../../utils/fetch';
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
