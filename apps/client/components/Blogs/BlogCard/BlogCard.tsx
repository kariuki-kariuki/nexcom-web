import React from 'react'
import { BlogInterface } from "@repo/nexcom-types"
import { Button, Card, Flex, Paper, Text, Title } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import classes from "./BlogCard.module.css";
import Link from 'next/link';

interface BlogCardInterface {
    blog: BlogInterface;
}

const BlogCard = ({ blog }: BlogCardInterface) => {
    const createdAt = new Date(blog.created_at);
    return (
        <Card className={classes.card} bg="none" py="xl">
            <Flex w="100%">
                <Paper bg="none" w={{ base: '100%', sm: "30%" }}>
                    <Text c="dimmed">{`${createdAt.getDate()}/${createdAt.getMonth()}/${createdAt.getFullYear()}`}</Text>
                </Paper>
                <Paper flex={1} bg="none">
                    <Title order={4}>{blog.title}</Title>
                    <Text c="coco.5">{blog.tags.join(" | ")}</Text>
                    <Text my="xl" c="dimmed">{blog.description}</Text>
                    <Link href="#" className={classes.link}> Read More <IconArrowRight size="28" className={classes.linkIcon} /></Link>
                </Paper>
            </Flex>
        </Card>
    )
}

export default BlogCard