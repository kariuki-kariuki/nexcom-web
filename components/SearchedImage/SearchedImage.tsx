import { ProductImage } from '@/lib/@types/shop'
import { Box, Group, Avatar, Stack, Notification, Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import classes from './SearchedImage.module.css'

const SearchedImage = ({image}: {image: ProductImage}) => {
  return (
    <Box maw={400}>
      <Link className={classes.link} href={`/business/product/${image.product?.id}`}><Text lineClamp={1} maw={200}>{`https://nexcom-ke.vercel.app/shop/product/${image.product?.id}`}</Text>
      <Notification
      title={image.product?.name}
      withCloseButton={false}
      color='coco.4'
      mb="xs"
      classNames={{ root: classes.notification, body: classes.notification, title: classes.notificationTitle }}
    >
      <div>
        <Group gap="sm" wrap="nowrap" justify="start">
          <Avatar size={70} src={image.url} radius="md" />
          <Stack w={{base: '100%', sm: '50%'}}>
            <Text size="sm" fw={500} lineClamp={3}>
              {image.product?.description}
            </Text>
          </Stack>
          </Group>
          </div>
          </Notification>
      </Link>
    </Box>
  )
}

export default SearchedImage