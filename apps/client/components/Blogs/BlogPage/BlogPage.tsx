import { Avatar, Card, CardSection, Container, Flex, Group, Paper, Stack, Text, Title } from '@mantine/core'
import { BlogInterface } from '@repo/nexcom-types'
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import React from 'react'
import './styles.css'
import { IconHeart, IconHeartPlus } from '@tabler/icons-react'
import Link from 'next/link'

interface BlogPageProps {
    blog: BlogInterface;
}
const BlogPage = ({ blog }: BlogPageProps) => {
    const date = new Date(blog.created_at);
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);
    const sanitizedContent = DOMPurify.sanitize(blog.content);
    return (
        <Container size="md" mt='xl'>
            <Flex direction={{ base: 'column-reverse', md: 'row' }}>
                <Paper w={{ base: '100%', sm: '20%' }} bg="none">
                    <Stack align="start" mb="md">
                        {blog.tags.map((tag) => (
                            <Link href={`/blogs/tags/${tag}`}><Text key={tag} c='coco.5'>{tag}</Text></Link>
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
                    <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                </section>
            </Flex>
        </Container>
    )
}

export default BlogPage