import Resources from '@/components/Resources/Resources';
import { Resource } from '@repo/nexcom-types';
import { get } from '@repo/shared-logic';
import React from 'react';

async function page() {
  const resourcedb = await get<Resource[]>('resource-files');
  return <Resources resourcedb={resourcedb} />;
}

export default page;
