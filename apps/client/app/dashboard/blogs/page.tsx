import React from 'react';
import Link from 'next/link';
import { Button } from '@mantine/core';

function Page() {
  return (
    <div>
      <Link href="/blogs/create">
        <Button>New blog</Button>
      </Link>
    </div>
  );
}

export default Page;
