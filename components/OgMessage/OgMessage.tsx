import { Avatar, Box, Group, Image, Notification, Stack, Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import classes from './OgMessage.module.css';
import { Product } from '@/lib/@types/shop';

interface IOgMessage {
  product: Product
}

/**
 * 
 * Opengraph message
 * 
 */
const OgMessage = ({ product }: IOgMessage) => {
  return (
    <Box py="sm" maw={400}>
      <Link className={classes.link} href={`/shop/product/${product.id}`}><Text lineClamp={1} maw={200}>{`https://nexcom-ke.vercel.app/shop/product/${product.id}`}</Text>
      <Notification
      title={product.name}
      withCloseButton={false}
      color='coco.4'
      mb="xs"
      classNames={{ root: classes.notification, body: classes.notification, title: classes.notificationTitle }}
    >
      <div>
        <Group gap="sm" wrap="nowrap" justify="start">
          <Avatar size={70} src={product.images[0]?.url} radius="md" />
          <Stack w={{base: '100%', sm: '50%'}}>
            <Text size="sm" fw={500} lineClamp={3}>
              {product.description}
            </Text>
          </Stack>
          </Group>
          </div>
          </Notification>
      </Link>
    </Box>
  )
}

export default OgMessage