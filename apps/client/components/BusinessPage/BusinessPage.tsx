import { ShopWithProducts } from '@/lib/@types/shop'
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
            <Stack align='center' justify='center' gap="xl">

              <div>
                <Text fw="bold" fz="h1">{shop.name || 'ShopName'} - {shop.category?.name} </Text>
              </div>
              <Group wrap='nowrap'>
                <Avatar src={shop.user?.avatar?.signedUrl} size="lg" name={shop.user?.fullName} />
                <Text>{`${shop.user?.firstName} ${shop.user?.lastName}`}</Text>
              </Group>
            </Stack>
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