import { Avatar, Button, Card, Group, Image, Text } from '@mantine/core';
import classes from './BlogVerticalCard.module.css';
import { BlogInterface } from '@repo/nexcom-types';
import { IconSettings } from '@tabler/icons-react';
import Link from 'next/link';

export type BloCardVerticalVariants = "default" | 'dashboard'

export interface BlogCardVerticalProps {
  blog: BlogInterface
  variant?: BloCardVerticalVariants
}
export function BlogCardVertical({ blog, variant = 'default' }: BlogCardVerticalProps) {
  return (
    <Card withBorder w={{ base: '100%', sm: "48%" }} radius="md" p={0} className={classes.card}>
      <Image
        src={blog.featuredImage.signedUrl}
        className={classes.image}
      />

      <div className={classes.body}>
        <Text tt="uppercase" c="dimmed" fw={700} size="xs">
          technology
        </Text>
        <Text className={classes.title} mt="xs" mb="md">
          {blog.title}
        </Text>
        <Group wrap="nowrap" gap="xs">
          <Group gap="xs" wrap="nowrap">
            <Avatar
              size={20}
              src={blog.author.avatar.signedUrl}
            />
            <Text size="xs">{blog.author.fullName}</Text>
          </Group>
          <Text size="xs" c="dimmed">
            •
          </Text>
          <Text size="xs" c="dimmed">
            Feb 6th
          </Text>
        </Group>
        <Group my="lg">
          {variant === 'dashboard' && 
          <Link href={`/dashboard/blogs/edit/${blog.id}`}>
          <Button color='coco.4' 
          leftSection={<IconSettings color='white'/>}
          >Edit Blog</Button>
          </Link>}
        </Group>
      </div>
    </Card>
  );
}