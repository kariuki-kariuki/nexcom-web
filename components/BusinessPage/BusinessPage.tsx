import { Shop } from '@/lib/@types/shop'
import { Group, Avatar, Stack, Text } from '@mantine/core'
import React from 'react'
import classes from "./BussinessPage.module.css";

interface IProps {
  shop: Shop
}
const BusinessPage = ({ shop }: IProps) => {
  return (
    <div>
      <div className={classes.card}>
        <section className={classes.section} style={{ backgroundImage: `url(${shop.bannerImage?.url || '/images/banner.png'})` }}>
        </section>
        <div className={classes.innerCard}>
          <div className={classes.avatar}>
            <Group align='center'>
              <Avatar src={shop.user?.photo} size="lg" />
              <Text pt="lg">{`${shop.user?.firstName} ${shop.user?.lastName}`}</Text>
            </Group>
          </div>
          <Stack pt="lg">
            <Text fw="bold">{shop.name || 'ShopName'} - {shop.category?.name} </Text>
            <Text c="dimmed" fz="12px">{shop.phone || '+254 712 345 678'}</Text>
            <Text c="dimmed" fz="xs">nexcom.ke@gmail.com</Text>
            <Text c="coco.4" fz="sm">{`https://nexcom-ke.vercel.app/shop/${shop.name?.toLowerCase() || 'ShopName'.toLowerCase()}`}</Text>
          </Stack>
        </div>
      </div>
    </div>
  )
}

export default BusinessPage