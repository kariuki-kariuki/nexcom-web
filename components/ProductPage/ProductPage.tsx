'use client';

import { datasource } from '@/lib/common/datasource';
import { useGlobalContext } from '@/lib/context/appContext';
import { useMantineTheme, LoadingOverlay, Card, Flex, Box, Group, Button, Text, SegmentedControl, ScrollArea, useMantineColorScheme, Center } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconTool, IconBasketPlus, IconBasketHeart, IconHeartPlus } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useState } from 'react'
import ImageCarousel from '../Shop/shopcomponents/ImageCarousel';
import classes from './ProductPage.module.css'
import { Product } from '@/lib/@types/shop';
import ContactSeller from '../ContactSeller/ContactSeller';
import ProductRating from '../Shop/ProductRating/ProductRating';

const ProductPage = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(product.product_sizes[0].id)
  const { user } = useGlobalContext();
  const { colorScheme } = useMantineColorScheme()
  const price = product.product_sizes.find((size) => size.id === selectedPrice)?.price;
  const sizes = product.product_sizes;
  const owner = product.shop?.user;
  async function handleSubmit() {
    const { data, error, loading } = await datasource.post({ formData: { quantity, productId: product.id, sizeId: selectedPrice }, path: 'carts' })
    setIsLoading(loading);

    if (error && !loading) {
      notifications.show({
        title: "Error",
        color: 'red.7',
        message: error
      })
    }
    if (data && !loading) {
      notifications.show({
        title: "Success",
        color: 'teal.7',
        message: 'Succesfully added item to cart'
      })
    }

  }
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return (
    <Box h='100%' bg={"none"} >
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'teal.7', type: 'bars' }}
      />
      {(owner && owner.id !== user?.id && product.shop) && <ContactSeller product={product} owner={owner} shop={product.shop} />}

      <Flex h={'100%'} bg={'none'} justify={'center'} content='center' align={'center'} >
        <Card className={classes.grid} withBorder my={'md'}> 
          <Flex h={'fit-content'} justify="center" direction={{ base: 'column', sm: 'row' }}>
            <Box w={{ base: '100%', sm: '50%', md: '30%' }} h={'100%'}>
              <Card
                p={{ base: 'lg', md: 'xl' }}
                h={{ base: '100%', sm: '100%' }}
                className={classes.card}
                radius={'lg'}
              >
                <Card.Section className={classes.card} h={'100%'}>
                  <ImageCarousel images={product?.images} />
                </Card.Section>
              </Card>
            </Box>
            <Box w={{ base: '100%', sm: '50%', md: '40%' }}>
              <Card
                p={{ base: 'sm', sm: 'sm' }}
                h={'100%'}
                className={classes.card}
              >
                <Flex direction={'column'} gap={5} h={'100%'} justify={'center'}>
                  <Box>
                    <Text fw={'500'} my={"lg"} className={classes.title}>
                      {product?.name}
                    </Text>
                    <ProductRating />
                    <Group justify="space-between">
                      <Text fw={'400'} fs={'italic'} py={'md'}>
                        Product Description
                      </Text>
                      <Text
                        w={'fit-content'}
                        fz={'xl'}
                        fw={'500'}
                        style={{ borderRadius: '10px' }}
                      >
                        {price && <Text fw="bold" fz="h4">Total {price * quantity}</Text>}
                      </Text>
                    </Group>
                    <Text
                      // fz={'sm'}
                      className="text-slate-500 font-serif"
                      lineClamp={5}
                    >
                      {product?.description}
                    </Text>
                  </Box>
                  <ScrollArea scrollbars="x">
                    <Text py="md">Price</Text>
                    <SegmentedControl
                      color='orange.7'
                      value={selectedPrice} onChange={setSelectedPrice} size='lg'
                      radius="lg"
                      bg={colorScheme === 'dark' ? "coco.1" : ''}
                      data={sizes.map((size) => ({ label: `${size.size}: ${size.price}`, value: size.id }))}
                    />
                  </ScrollArea>

                  <Group justify={'center'} wrap="nowrap" px={0}>
                  </Group>
                  {product.shop?.id === user?.shop?.id ? (
                    // <Group justify={'center'} w={'100%'} p={'lg'}>
                    <Link href={`/dashboard/products/edit/${product.id}`}>
                      <Button
                        bg={'teal'}
                        size='lg'
                        tw="200"
                        fullWidth
                        rightSection={<IconTool size={24} color="white" />}
                      >
                        EDIT
                      </Button>
                    </Link>
                    // </Group>
                  ) : (
                    <div>
                      <Group
                        justify="space-between"
                        py={'md'}
                      >
                        <Button.Group>
                          <Button
                            variant="default"
                            bg="red"
                            c={'white'}
                            fz={'xl'}
                            onClick={() => {
                              if (quantity > 1) {
                                setQuantity(quantity - 1);
                              }
                            }}
                          >
                            -
                          </Button>
                          <Button variant="default">{quantity}</Button>
                          <Button
                            variant="default"
                            bg="teal"
                            c={'white'}
                            fz={'xl'}
                            onClick={() => setQuantity(quantity + 1)}
                          >
                            +
                          </Button>
                        </Button.Group>
                        
                      </Group>
                      <Group justify="center" grow>
                        <Button
                          leftSection={<IconBasketPlus size={20} />}
                          onClick={handleSubmit}
                          bg={'teal.7'}
                        >
                          ADD TO CART
                        </Button>
                        <Button
                          leftSection={<IconHeartPlus size={20} color='red' />}
                          onClick={handleSubmit}
                          variant='outline'
                          color='teal.7'
                        >
                          ADD TO WISHLIST
                        </Button>
                      </Group>{' '}
                    </div>
                  )}
                </Flex>
              </Card>
            </Box>
          </Flex>
        </Card>
      </Flex>
    </Box   >
  )
}

export default ProductPage