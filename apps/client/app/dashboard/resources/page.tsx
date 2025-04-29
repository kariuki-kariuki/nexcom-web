import React from 'react';
import Resources from '../../../components/Resources/Resources';
import { Resource } from '../../../lib/@types/resource';
import get from '../../../utils/fetch';

async function page() {
  const resourcedb = await get<Resource[]>('resource-files');
  return <Resources resourcedb={resourcedb} />;
}

export default page;
