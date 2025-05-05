import { ImageInterface } from '@/lib/@types/shop'
import { AspectRatio, Avatar, Grid, GridCol, Image, Paper, SimpleGrid } from '@mantine/core';
import React from 'react'

interface Props {
  images: ImageInterface[] | null;
}
const MessageImages = ({ images }: Props) => {
  const messageImages = images?.map((image) => <GridCol span={6} key={
    image.id
  }>
    <AspectRatio ratio={1}>
      <Avatar
        src={image.signedUrl}
        alt={image.altText}
        w="100%"
        h="auto"
        radius={0}
        variant='transparent'
      />
    </AspectRatio>
  </GridCol>);
  return (
    <Paper maw={400} bg="none">
      <Grid grow gutter={1}>
        {messageImages}
      </Grid>

    </Paper>
  )
}

export default MessageImages