'use client';
import { Avatar, Button, Group, Stack, Text } from '@mantine/core'
import React from 'react'
import classes from './ShopCard.module.css';
import QRCode from 'react-qr-code'
import Link from 'next/link';
import { useGlobalContext } from '@/lib/context/appContext';
import { IconMessage } from '@tabler/icons-react';
import { Shop } from '@/lib/@types/shop';


interface IProps {
  shop: Shop
}
const ShopCard = ({ shop }: IProps) => {
  const { user } = useGlobalContext()
  return (
    <div className={classes.card}>
      <div className={classes.innerCard}>

        <Group gap={"sm"} justify='space-between'>
          <Text c="dimmed" fz="12px">0{shop.phone}</Text>
          <Button size='xs' variant='light' color="coco.4"><IconMessage size={15} /></Button>
        </Group>
        <Stack gap="5px" align='center'>
          <Avatar src={shop.user?.photo} />
          <Text fw="bold">{shop.name} - {shop.category?.name}</Text>
          <Text c="dimmed" ta="center" fz="xs">nexcom.ke@gmail.com</Text>
        </Stack>
        <Link href={`/shop/${shop.name.toLowerCase()}`}>
            <Button fullWidth variant='light'  radius="xl">Visit</Button>
        </Link>
      </div>

    </div>
  )
}

export default ShopCard