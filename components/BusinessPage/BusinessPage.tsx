import { Shop, ShopWithProducts } from '@/lib/@types/shop'
import { Group, Avatar, Stack, Text, Container, Divider, Paper } from '@mantine/core'
import React from 'react'
import classes from "./BussinessPage.module.css";
import ProductCard from '../Shop/Products/ProductCard';

interface IProps {
  shop: ShopWithProducts | null
}
const BusinessPage = ({ shop }: IProps) => {

  if (!shop) return <Text>Business Not found</Text>
  return (
    <Container className={classes.main} size="lg">
      <div className={classes.card}>
        <section className={classes.section} style={{ backgroundImage: `url(${shop.bannerImage?.url || '/images/banner.png'})` }}>
        </section>
        <div className={classes.innerCard}>
          <div className={classes.avatar}>
            <Group align='center' justify='center' wrap='wrap'>
              <Group wrap='nowrap'>
                <Avatar src={shop.user?.photo} size="lg" />
                <Text>{`${shop.user?.firstName} ${shop.user?.lastName}`}</Text>
              </Group>
              <div>
                <Text fw="bold">{shop.name || 'ShopName'} - {shop.category?.name} </Text>
              </div>
            </Group>
          </div>
          <Paper bg="none" my="md">
            <div className={classes.flex}>
              {shop?.products?.map((product) => <ProductCard product={product} key={product.id} />)}
            </div>
            <Divider my="md" />
            <Stack pt="lg" align='center'>
              <Text c="dimmed" fz="12px">{shop.phone || '+254 712 345 678'}</Text>
              {/* <Text c="dimmed" fz="xs">nexcom.ke@gmail.com</Text> */}
              <Text c="coco.4" fz="sm">{`https://nexcom-ke.vercel.app/business/${shop.name?.toLowerCase() || 'ShopName'.toLowerCase()}`}</Text>
            </Stack>
          </Paper>
        </div>
      </div>
    </Container>
  )
}

export default BusinessPage