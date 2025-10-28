import React from 'react';
import Link from 'next/link';
import { Button, Container, Flex } from '@mantine/core';
import { get } from '@repo/shared-logic';
import { BlogInterface, BlogResultInterFace } from '@repo/nexcom-types';
import { BlogCardVertical } from '@/components/Blogs/BlogCard/BlogVerticalCard';
import Blogs from '@/components/Blogs/Blogs';

async function Page() {
  const res = await get<BlogResultInterFace>('blogs/my?limit=10')
  return (
    <Blogs items={res} />
  );
}

export default Page;
