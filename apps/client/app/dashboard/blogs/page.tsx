import React from 'react';
import Link from 'next/link';
import { Button } from '@mantine/core';
import SimpleRoute from '../../../components/SimpleRoute/SimpleRoute';

function Page() {
  return (
    <div>
      <SimpleRoute tag="All blogs" main="Blogs" />
      <Link href="/blogs/create">
        <Button>New blog</Button>
      </Link>
    </div>
  );
}

export default Page;
