import React from 'react'
import { BlogResultInterFace } from "@repo/nexcom-types"
import { Container, Divider, Text, Title } from '@mantine/core';
import BlogCard from './BlogCard/BlogCard';
interface BlogsHomeInterface {
    blogsResult: BlogResultInterFace,
}
const BlogsHome = ({ blogsResult }: BlogsHomeInterface) => {
    const {blogs} = blogsResult;
  return (
    <Container my="xl" size="xl">
        <Title c="coco.5">Latest Blogs.</Title>
        <Text mb="xl" c="dimmed" size='lg'>Catch Up with the latest blogs.</Text>
        {blogs.map((blog) => <BlogCard blog={blog} key={blog.id}/>)}
    </Container>
  )
}

export default BlogsHome