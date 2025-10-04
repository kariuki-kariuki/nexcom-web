import EditJob from '@/components/EditJob/EditJob';
import { JobDto } from '@repo/nexcom-types';
import { get } from '@repo/shared-logic';
import React from 'react';

async function page({ params }: { params: { slug: string } }) {
  const jobdb = await get<JobDto>(`jobs/${params.slug}`);
  return (
    <div>
      <EditJob jobdb={jobdb} />
    </div>
  );
}

export default page;
