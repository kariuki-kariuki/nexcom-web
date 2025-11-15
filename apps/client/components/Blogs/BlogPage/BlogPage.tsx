'use client'
import { Avatar, Container, Flex, Group, Paper, Stack, Text, Title } from '@mantine/core'
import { BlogInterface } from '@repo/nexcom-types'
import DOMPurify from "isomorphic-dompurify";
import React from 'react'
import './styles.css'
import { IconHeartPlus } from '@tabler/icons-react'
import Link from 'next/link'

interface BlogPageProps {
    blog: BlogInterface;
}
const BlogPage = ({ blog }: BlogPageProps) => {
    const date = new Date(blog.created_at);
    const content = DOMPurify.sanitize(blog.content);
    return (
        <Container size="md" mt='xl'>
            <Flex direction={{ base: 'column-reverse', md: 'row' }}>
                <Paper w={{ base: '100%', sm: '20%' }} bg="none">
                    <Stack align="start" mb="md">
                        {blog.tags.map((tag, idx) => (
                            <Link key={idx} href={`/blogs/tags/${tag}`}><Text key={tag} c='coco.5'>{tag}</Text></Link>
                        ))}
                    </Stack>
                </Paper>
                <section style={{ flex: 1}}>
                    <Title mb='xl'>{blog.title}</Title>
                    <Text>{blog.description}</Text>
                    <Group my="md">
                        <Group>
                            <Avatar src={blog.author.avatar?.signedUrl || '/placeholder.png'} />
                            <Text>{blog.author.fullName}</Text>
                        </Group>
                        <Text>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</Text>
                        <IconHeartPlus color='red' />
                    </Group>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </section>
            </Flex>
        </Container>
    )
}

export default BlogPage