import React from 'react';
import get from '../../../../../utils/fetch';
import { JobDto } from '../../../../../lib/@types/jobs';
import EditJob from '../../../../../components/EditJob/EditJob';

async function page({ params }: { params: { slug: string } }) {
  const jobdb = await get<JobDto>(`jobs/${params.slug}`);
  return (
    <div>
      <EditJob jobdb={jobdb} />
    </div>
  );
}

export default page;
