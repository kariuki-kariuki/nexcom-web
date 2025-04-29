import { ProductVideo } from '@/lib/@types/shop'
import { Divider, Group, Paper, ScrollArea, Text } from '@mantine/core';
import React, { useState } from 'react'
import CommentCard from './CommentCard';
import CreateComment from './CreateComment';
import classes from './comment.module.css';
interface IProps {
  video: ProductVideo;
}

const CommentSection = ({ video}: IProps) => {
  const [comments, setComments] = useState(video.product.comments);
  return (
    <div className={classes.comments}>
      <Paper visibleFrom='sm' className={classes.commentSection} bg="none">
        <Divider my="md" />
        <Group justify='space-between'>
          <Text>Comments</Text>
          <CreateComment productId={video.product.id} setComments={setComments} />
        </Group>
        <Divider my="md" />

        <ScrollArea scrollbars="xy" flex={1}>
          {comments.map((comment => <CommentCard comment={comment} key={comment.id} />))}
        </ScrollArea>
      </Paper>
      
    </div>

  )
}

export default CommentSection