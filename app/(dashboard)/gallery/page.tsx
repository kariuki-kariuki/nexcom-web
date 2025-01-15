import React from 'react';
import { IGallery } from '../../../lib/@types/gallery';
import get from '../../../utils/fetch';
import Gallery from '../../../components/Gallery/Gallery';

async function Page() {
  const galleries = await get<IGallery[]>('galleries');
  return <Gallery galleriesdb={galleries} />;
}

export default Page;
