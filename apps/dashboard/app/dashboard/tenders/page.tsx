import React from 'react';
import { TenderInterface } from '@repo/nexcom-types';
import { get } from '@repo/shared-logic';
import Tenders from '@/components/Tenders/Tenders';

async function page() {
  const tenderdb = await get<TenderInterface[]>('tenders');
  return <Tenders tenderdb={tenderdb} />;
}

export default page;
