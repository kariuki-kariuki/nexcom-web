import React from 'react';
import get from '../../../../utils/fetch';
import { JobDto } from '../../../../lib/@types/jobs';
import Jobs from '../../../../components/Jobs/Jobs';

async function page() {
  const jobsdb = await get<JobDto[]>('jobs/admin');
  return (
    <div>
      <Jobs jobsdb={jobsdb} />
    </div>
  );
}

export default page;
