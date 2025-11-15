import React from 'react'
import { BlogInterface } from "@repo/nexcom-types"
import { AspectRatio, Card, Flex, Image, Paper, Text, Title } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import classes from "./BlogCard.module.css";
import Link from 'next/link';
import { MotionWrapper } from '@/components/ui/MotionWrapper';

interface BlogCardInterface {
    blog: BlogInterface;
    variant?: 'small' | 'large';
}

const BlogCard = ({ blog }: BlogCardInterface) => {
    const createdAt = new Date(blog.created_at);
    return (
        <MotionWrapper>
            <Card className={classes.card} bg="none" py="xl">
                <Flex w="100%" wrap="wrap" gap='md'>
                    <Paper bg="none" w={{ base: '100%', sm: "30%" }}>
                        <Text c="dimmed">{`${createdAt.getDate()}/${createdAt.getMonth()}/${createdAt.getFullYear()}`}</Text>
                        <AspectRatio ratio={16 / 9} mt="sm">
                            <Image src={blog.featuredImage?.signedUrl || '/placeholder.png'} alt={blog.title} className={classes.image} />
                        </AspectRatio>
                    </Paper>
                    <Paper flex={1} bg="none">
                        <Title order={4}>{blog.title}</Title>
                        <Flex gap="xs" wrap="wrap" align="center" my="sm">
                            {blog.tags.map((tag, index) => <Link href={`/blogs/tags/${tag}`} key={index}><Text c='coco.5'>{tag} | </Text></Link>)}
                        </Flex>
                        <Text my="xl" c="dimmed">{blog.description}</Text>
                        <Link href={`/blogs/${blog.id}`} className={classes.link}> Read More <IconArrowRight size="28" className={classes.linkIcon} /></Link>
                    </Paper>
                </Flex>
            </Card>
        </MotionWrapper>
    )
}

export default BlogCard