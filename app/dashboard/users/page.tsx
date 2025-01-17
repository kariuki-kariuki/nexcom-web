import React from 'react';
import { redirect } from 'next/navigation';
import { AllUsers } from '../../../components/AllUsers/AllUsers';
import { GlobalUser } from '../../../lib/@types/app';
import get from '../../../utils/fetch';

async function Page() {
  const users = await get<GlobalUser[]>('users');
  if (!users) redirect('/products');
  return (
    <div>
      <AllUsers dbusers={users} />
    </div>
  );
}

export default Page;
