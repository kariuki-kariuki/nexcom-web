import { ImageInterface } from '@/lib/@types/shop'
import { AspectRatio, Grid, GridCol, Image, Paper, SimpleGrid } from '@mantine/core';
import React from 'react'

interface Props {
  images: ImageInterface[] | null;
}
const MessageImages = ({ images }: Props) => {
  const messageImages = images?.map((image) => <GridCol span={6} key={
    image.id
  }>
    <AspectRatio ratio={1}>
      <Image
        src={image.signedUrl}
        alt={image.altText}
        w="100%"
        h="auto"
      />
    </AspectRatio>
  </GridCol>);
  return (
    <Paper maw={400}>
      <Grid grow gutter={0}>
        {messageImages}
      </Grid>

    </Paper>
  )
}

export default MessageImages