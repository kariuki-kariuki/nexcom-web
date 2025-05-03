import React from 'react';
import get from '../../../../utils/fetch';
import Tenders from '../../../../components/Tenders/Tenders';
import { TenderInterface } from '../../../../lib/@types/tender';

async function page() {
  const tenderdb = await get<TenderInterface[]>('tenders');
  return <Tenders tenderdb={tenderdb} />;
}

export default page;
