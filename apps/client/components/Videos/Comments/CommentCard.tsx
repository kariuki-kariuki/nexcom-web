import { ProductComment } from '@/lib/@types/shop'
import { Avatar, Group, Stack, Text } from '@mantine/core'
import React from 'react'

interface IProps {
  comment: ProductComment
}
const CommentCard = ({ comment }: IProps) => {
  return (
    <div>
      <Group justify='start' gap="md" wrap='nowrap' p="xs">
        <Avatar src={comment.user?.avatar?.signedUrl} size="sm"/>
        <Stack gap={0}>
          <Text c="dimmed" fz="xs">{`${comment.user.fullName} ${comment.user.lastName}`}</Text>
          <Text fz="sm">{comment.content}</Text>
        </Stack>
      </Group>
    </div>
  )
}

export default CommentCard