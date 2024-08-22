import { Badge, Button, Card, Grid, Group, Modal, Text } from '@mantine/core';
import { useState } from 'react';
import { ProductWithShop } from '../../../@types/shop';
import ImageCarousel from '../shopcomponents/ImageCarousel';
import { IconBasketPlus } from '@tabler/icons-react';

interface Iprops {
  opened: boolean;
  close: () => void;
  product: ProductWithShop;
}

function ProductModal({ opened, close, product }: Iprops) {
  const [quantity, setQuantity] = useState(1);
  const colors = product.colors?.map((color, index) => (
    <Badge bg={color} variant="light" key={index}>
      {color}
    </Badge>
  ));
  return (
    <Modal
      opened={opened}
      onClose={() => {close(); setQuantity(1)}}
      withCloseButton={true}
      size={'auto'}
      padding={'md'}
      bg={'blue'}
    >
      <Grid bg={'coco-1'}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card p={{ base: 'sm', md: 'xl' }}>
            <Card.Section className="flex content-center">
              <ImageCarousel images={product?.images} />
            </Card.Section>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card className="md:p-5 h-full flex content-center" p={'xl'}>
            <Card.Section className="md:p-5">
              <Text className="text-center">{product?.name}</Text>
            </Card.Section>
            <Card.Section py={'xl'}>
              <p className="text-slate-200 font-mono">Product Description</p>
              <Text fz={'sm'} className="text-slate-500 font-serif">
                {product?.description}
              </Text>
              <Text> Price: ${product?.price}</Text>
            </Card.Section>
            <Card.Section>
              <Group>{colors}</Group>
            </Card.Section>
            <Card.Section>
              <Group justify="space-between" pr={'xl'}>
                <Button.Group py={'xl'}>
                  <Button
                    variant="default"
                    bg="pink"
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
                    bg="orange"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </Button.Group>
                <Text>Total {product.price * quantity}</Text>
              </Group>
              <Group justify="center">
                <Button
                  leftSection={<IconBasketPlus size={14} />}
                  onClick={() => setQuantity(1)}
                  variant="outline"
                >
                  Add To Cart
                </Button>
              </Group>
            </Card.Section>
          </Card>
        </Grid.Col>
      </Grid>
    </Modal>
  );
}

export default ProductModal;
