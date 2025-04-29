import React from 'react'
import classes from './Actions.module.css';
import { Avatar, Burger, Stack } from '@mantine/core';
import { ProductVideo } from '@/lib/@types/shop';


interface IProps {
  opened: boolean;
  toggle: () => void;
  video: ProductVideo;
}
const Actions = ({ video, opened, toggle }: IProps) => {
  return (
    <div className={classes.main}>
      <Stack className={classes.stack} p="sm" justify='center' align='center'>
        <Avatar src={video.product.images[0].url} size="lg" color='coco.5' classNames={{ image: classes.avatar }} />
        <Burger my="md" opened={opened} onClick={toggle} color='coco.5' />
      </Stack>
    </div>
  )
}

export default Actions