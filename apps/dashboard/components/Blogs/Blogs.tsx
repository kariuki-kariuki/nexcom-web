'use client';
import { Container, Button, Flex, useMantineTheme, Group, SegmentedControl } from '@mantine/core';
import { BlogResultInterFace } from '@repo/nexcom-types'
import Link from 'next/link';
import React, { useState } from 'react'
import { BlogCardVertical } from './BlogCard/BlogVerticalCard';
import { useMediaQuery } from '@mantine/hooks';
import classes from "./Blogs.module.css";
import { IconCirclePlusFilled } from '@tabler/icons-react';

const Blogs = ({ items }: { items: BlogResultInterFace | null  }) => {
    const [active, setActive] = useState('All');
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const filterBlogs = items?.blogs.filter((product) => {
        if (active.toLowerCase() === 'all') return true;
        return active.toLowerCase() === product.status.toLowerCase();
    })
        .map((blog) => (
            <BlogCardVertical blog={blog} variant='dashboard' key={blog.id} />
        ));

    return (
        <Container size="xl" py="xl">
            <Group justify="space-between" wrap="nowrap" pb="md">
                <SegmentedControl
                    radius="xl"
                    size={mobile ? 'xs' : 'lg'}
                    data={['All', 'Published', 'Draft', 'Archived']}
                    classNames={classes}
                    onChange={setActive}
                />
                <Link href="/dashboard/blogs/create">
                    <Button
                        size={mobile ? 'xs' : 'lg'}
                        color="coco.5"
                        leftSection={<IconCirclePlusFilled color="white" />}
                        radius="xl"
                    >
                        Add
                    </Button>
                </Link>
            </Group>

            <Flex wrap="wrap" gap="sm">
                {filterBlogs}
            </Flex>
        </Container>
    )
}

export default Blogs