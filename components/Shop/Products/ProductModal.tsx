import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  LoadingOverlay,
  Modal,
  ScrollArea,
  SegmentedControl,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core';
import { useContext, useState } from 'react';
import { Product, Shop } from '@/lib/@types/shop';
import ImageCarousel from '../shopcomponents/ImageCarousel';
import { IconBasketPlus, IconTool } from '@tabler/icons-react';
import { AppContext } from '@/lib/context/appContext';
import classes from './ProductModal.module.css';
import { useMediaQuery } from '@mantine/hooks';
import { GlobalUser, UserContextType } from '@/lib/@types/app';
import { datasource } from '@/lib/common/datasource';
import { notifications } from '@mantine/notifications';
import Link from 'next/link';
import ContactSeller from '@/components/ContactSeller/ContactSeller';
import CreateVideo from '@/components/CreateVideo/CreateVideo';
interface Iprops {
  opened: boolean;
  toggle: () => void;
  product: Product;
  owner: GlobalUser;
  shop: Shop;
}

function ProductModal({ opened, toggle, product, owner, shop }: Iprops) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AppContext) as UserContextType;
  const [selectedPrice, setSelectedPrice] = useState(product.product_sizes[0].id)
  const sizes = product.product_sizes;
  const { colorScheme } = useMantineColorScheme()
  const price = product.product_sizes.find((size) => size.id === selectedPrice)?.price;

  
  
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
    <Modal
      opened={opened}
      onClose={() => {
        toggle();
        setQuantity(1);
      }}
      size={'100%'}
      padding={'md'}
      bg={'blue'}
      h={'100%'}
      overlayProps={{
        h: '100vh'
      }}
      classNames={{ body: classes.body, header: classes.header, content: classes.content }}
    >
      {product && <ContactSeller product={product} owner={owner} shop={shop} />}
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'teal.7', type: 'bars' }}
      />
      <Grid bg={'coco-0'} h={'100%'}>
        <Grid.Col span={{ base: 12, sm: 6 }} h={'100%'}>
          <Card
            p={{ base: 'sm', md: 'xl' }}
            h={{ base: '100%', sm: '100%' }}
            className={classes.card}
            radius={'lg'}
          >
            <Card.Section className={classes.card} h={'100%'}>
              <ImageCarousel images={product?.images} />
            </Card.Section>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card
            p={{ base: 'sm', sm: 'xl' }}
            h={'100%'}
            className={classes.card}
          >
            <Flex direction={'column'} gap={5} h={'100%'} justify={'center'}>
              <Text fw={'500'} fz={'lg'} ta={'center'}>
                {product?.name}
              </Text>
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
                    {product.product_sizes ? `Price: ${price}` : ''}
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
              <ScrollArea scrollbars="x">
                <Text>Size</Text>
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
              {shop.id === user?.shop?.id ? (
                <Group justify={'center'} w={'100%'} p={'lg'}>
                  <Link href={`/dashboard/products/edit/${product.id}`}>
                    <Button
                      bg={'coco.4'}
                      leftSection={<IconTool size={14} color="white" />}
                    >
                      Edit
                    </Button>
                  </Link>
                  <CreateVideo product={product}/>
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
                    {price && <Text>Total {price * quantity}</Text>}
                  </Group>
                  <Group justify="center">
                    <Button
                      leftSection={<IconBasketPlus size={20} />}
                      onClick={handleSubmit}
                      bg={'coco.4'}
                    >
                      Add To Cart
                    </Button>
                  </Group>{' '}
                </div>
              )}
            </Flex>
          </Card>
        </Grid.Col>
      </Grid>
    </Modal>
  );
}

export default ProductModal;
