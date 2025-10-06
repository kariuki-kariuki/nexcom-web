import Jobs from '@/components/Jobs/Jobs';
import { JobDto } from '@repo/nexcom-types';
import { get } from '@repo/shared-logic';
import React from 'react';

async function page() {
  const jobsdb = await get<JobDto[]>('jobs/admin');
  return (
    <div>
      <Jobs jobsdb={jobsdb} />
    </div>
  );
}

export default page;
