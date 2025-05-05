import { Avatar, Box, Group, Paper, Stack, Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import classes from './OgMessage.module.css';
import { Product } from '@/lib/@types/shop';

interface IOgMessage {
  product: Product
  outGoing?: boolean
}

/**
 * 
 * Opengraph message
 * 
 */
const OgMessage = ({ product, outGoing }: IOgMessage) => {
  return (
    <Box py="sm" maw={400} >
      <Link className={classes.link} href={`/business/product/${product.id}`}><Text lineClamp={1} maw={200}>{`https://nexcom-ke.vercel.app/business/product/${product.id}`}</Text>
        <Paper
          title={product.name}
          color='coco.4'
          p="xs"
          data-active={outGoing}
          className={classes.notifications}
        >
          <div>
            <Group gap="sm" wrap="nowrap" justify="start">
              <Avatar size={70} src={product.images[0]?.signedUrl} radius="md" name={product.name} />
              <Stack w={{ base: '100%', sm: '50%' }}>
                <Text size="sm" fw={500} lineClamp={3}>
                  {product.description}
                </Text>
              </Stack>
            </Group>
          </div>
        </Paper>
      </Link>
    </Box>
  )
}

export default OgMessage