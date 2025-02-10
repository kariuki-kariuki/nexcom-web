'use client';

import { UserContextType } from '@/lib/@types/app';
import { datasource } from '@/lib/common/datasource';
import { AppContext } from '@/lib/context/appContext';
import { useMantineTheme, Modal, LoadingOverlay, Grid, Card, Flex, Box, Group, Button, Text, Paper } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconTool, IconBasketPlus } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useContext, useState } from 'react'
import ImageCarousel from '../Shop/shopcomponents/ImageCarousel';
import classes from './ProductPage.module.css'
import { Product } from '@/lib/@types/shop';
import SimpleHeader from '../SimpleHeader/SimpleHeader';

const ProductPage = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AppContext) as UserContextType;
  async function handleSubmit() {
    const { data, error, loading } = await datasource.post({ formData: { quantity, productId: product.id }, path: 'orders'})
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
    <Box mih='100vh' bg={"none"} >
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'teal.7', type: 'bars' }}
      />
      <Box visibleFrom='sm'>
        <SimpleHeader />
      </Box>
      <Flex h={'100%'} bg={'none'} justify={'center'} content='center' align={'center'} >
        <Card className={classes.grid} withBorder my={'md'}>
          <Text fw={'500'} fz={'lg'} my={"lg"} ta={'center'}>
            {product?.name}
          </Text>
          <Flex h={'fit-content'} direction={{ base: 'column', sm: 'row'}}>
            <Box w={{ base: '100%', sm: '50%' }} h={'100%'}>
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
            <Box w={{ base: '100%', sm: '50%' }}>
              <Card
                p={{ base: 'sm', sm: 'sm' }}
                h={'100%'}
                className={classes.card}
              >
                <Flex direction={'column'} gap={5} h={'100%'} justify={'center'}>
                  <Box>
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
                        {' '}
                        {product.product_sizes ? `Price: ${product?.product_sizes[0].price}` : ''}
                      </Text>
                    </Group>
                    <Text
                      fz={'sm'}
                      className="text-slate-500 font-serif"
                      lineClamp={5}
                    >
                      {product?.description}
                    </Text>
                  </Box>

                  <Group justify={'center'} wrap="nowrap" px={0}>
                  </Group>
                  {product.shop?.id === user?.shop?.id ? (
                    <Group justify={'center'} w={'100%'} p={'lg'}>
                      <Link href={`/dashboard/products/edit/${product.id}`}>
                        <Button
                          bg={'teal'}
                          leftSection={<IconTool size={14} color="white" />}
                        >
                          Edit
                        </Button>
                      </Link>
                    </Group>
                  ) : (
                    <div>
                      <Group
                        justify={mobile ? 'center' : 'space-between'}
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
                        <Text>Total {product?.product_sizes[0].price * quantity}</Text>
                      </Group>
                      <Group justify="center">
                        <Button
                          leftSection={<IconBasketPlus size={20} />}
                          onClick={handleSubmit}
                          bg={'teal.7'}
                          w={{base: '100%'}}
                          size='lg'
                        >
                          Add To Cart
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