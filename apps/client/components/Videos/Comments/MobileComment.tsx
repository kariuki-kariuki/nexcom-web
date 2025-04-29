import { Paper, Divider, Group, ScrollArea, Text, Burger } from '@mantine/core'
import React, { useState } from 'react'
import CommentCard from './CommentCard'
import CreateComment from './CreateComment'
import classes from './comment.module.css'
import { ProductVideo } from '@/lib/@types/shop'


interface IProps {
  video: ProductVideo;
  opened: boolean;
  toggle: () => void;
}

const MobileComment = ({ video, opened, toggle }: IProps) => {
  const [comments, setComments] = useState(video.product.comments);

  return (
    <Paper hiddenFrom='sm' display={opened ? 'block' : 'none'} className={classes.commentSectionMobile}>
      <Divider my="md" />
      <Group justify='space-between'>
        <Text>Comments</Text>
        <Group align='center'>
          <CreateComment productId={video.product.id} setComments={setComments} />
          <Burger opened={opened} onClick={toggle} color='red'/>
        </Group>

      </Group>
      <Divider my="md" />

      <ScrollArea scrollbars="xy" h="50vh">
        {comments.map((comment => <CommentCard comment={comment} key={comment.id} />))}
      </ScrollArea>
    </Paper>

  )
}

export default MobileComment