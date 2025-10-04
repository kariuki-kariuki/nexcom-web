import Gallery from '@/components/Gallery/Gallery';
import { IGallery } from '@repo/nexcom-types';
import { get } from '@repo/shared-logic';
import React from 'react';

async function Page() {
  const galleries = await get<IGallery[]>('galleries');
  return <Gallery galleriesdb={galleries} />;
}

export default Page;
