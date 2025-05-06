'use client';
import { Avatar, Button, Group, Stack, Text } from '@mantine/core'
import React from 'react'
import classes from './ShopCard.module.css';
import Link from 'next/link';
import { IconMessage } from '@tabler/icons-react';
import { Shop } from '@/lib/@types/shop';
import { useGlobalStore } from '@/lib/context/global-store.provider';


interface IProps {
  shop: Shop
}
const ShopCard = ({ shop }: IProps) => {
  const user = useGlobalStore((state) => state.user);
  return (
    <div className={classes.card}>
      <div className={classes.innerCard}>

        <Group gap={"sm"} justify='space-between'>
          <Text c="dimmed" fz="12px">0{shop.phone}</Text>
          <Button size='xs' variant='light' color="coco.4"><IconMessage size={15} /></Button>
        </Group>
        <Stack gap="5px" align='center'>
          <Avatar src={shop.user?.avatar?.signedUrl} name={shop.user?.fullName} />
          <Text fw="bold">{shop.name}</Text>
          <Text>{shop.category?.name}</Text>
        </Stack>
        <Link href={`/business/${shop.name.toLowerCase()}`}>
            <Button fullWidth variant='light'  radius="xl">Visit</Button>
        </Link>
      </div>

    </div>
  )
}

export default ShopCard