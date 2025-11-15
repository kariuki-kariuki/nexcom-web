import BlogCard from '@/components/Blogs/BlogCard/BlogCard';
import get from '@/utils/fetch';
import { Container, Title } from '@mantine/core';
import { BlogResultInterFace } from '@repo/nexcom-types';
import React from 'react'

interface Params {
  params: {
    tag: string;
  }
}
const page = async ({params}: Params) => {
  const results = await get<BlogResultInterFace>(`blogs/public?tag=${params.tag}`)
  return ( 
    <Container size="xl" my="md">
      <Title my='xl'>{params.tag.toUpperCase()}</Title>
      {results && results.blogs.map((blog) => <BlogCard blog={blog} key={blog.id} />)}
    </Container>
  )
}

export default page