import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Modal,
  Text,
} from '@mantine/core';
import { useContext, useState } from 'react';
import { ProductWithShop, ShopProduct } from '../../../@types/shop';
import ImageCarousel from '../shopcomponents/ImageCarousel';
import { IconBasketPlus, IconTool } from '@tabler/icons-react';
import { url } from '../../../data/url';
import { AppContext } from '../../../context/appContext';
import { UserContextType } from '../../../@types/app';
import classes from './ProductModal.module.css';
interface Iprops {
  opened: boolean;
  toggle: () => void;
  product: ProductWithShop | ShopProduct;
  shopId?: number;
}

function ProductModal({ opened, toggle, product, shopId }: Iprops) {
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(AppContext) as UserContextType;
  const colors = product.colors?.map((color, index) => (
    <Badge variant="filled" color={color} key={index} p={'sm'}>
      {color}
    </Badge>
  ));
  console.log(`Shop id: ${shopId}`);
  const token = localStorage.getItem('token');
  function handleSubmit() {
    fetch(`${url}/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity, productId: product.id }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((res) => {
            console.log(res);
            setQuantity(1);
            close();
          });
        } else {
          res.json().then((r) => console.log(r));
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
  return (
    <Modal
      opened={opened}
      onClose={() => {
        toggle();
        setQuantity(1);
      }}
      withCloseButton={false}
      size={'100%'}
      padding={'md'}
      bg={'blue'}
      h={'100%'}
      overlayProps={{
        h: '100vh',
      }}
      classNames={{ body: classes.body }}
    >
      <Grid bg={'coco-1'} h={'100%'}>
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
          <Card p={'xl'} h={'100%'} className={classes.card}>
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
                    // bg={'purple'}
                    w={'fit-content'}
                    // c={'white'}
                    // p={'xs'}
                    fz={'xl'}
                    fw={'500'}
                    style={{ borderRadius: '10px' }}
                  >
                    {' '}
                    Price: ${product?.price}
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

              <Group justify={'center'}>{colors}</Group>
              {shopId === user?.shop?.id ? (
                <Group justify={'center'} w={'100%'} p={'lg'}>
                  <Button
                    bg={'teal'}
                    leftSection={<IconTool size={14} color="white" />}
                  >
                    Edit
                  </Button>
                </Group>
              ) : (
                <div>
                  <Group justify="space-between" pr={'xl'}>
                    <Button.Group py={'xl'}>
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
                    <Text>Total {product.price * quantity}</Text>
                  </Group>
                  <Group justify="center">
                    <Button
                      leftSection={<IconBasketPlus size={20} />}
                      onClick={handleSubmit}
                      bg={'teal.7'}
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
