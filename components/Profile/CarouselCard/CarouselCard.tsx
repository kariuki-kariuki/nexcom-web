import { Image, Card, Button } from '@mantine/core';
import { ShopProduct } from '../../../lib/@types/shop';
import { IconArrowUpRight } from '@tabler/icons-react';
import classes from './CarouselCard.module.css';
import ProductModal from '../../../src/apps/Shop/Products/ProductModal';
import { useDisclosure } from '@mantine/hooks';
interface Iprop {
  product: ShopProduct;
  shopId: number;
}
export function CarouselCard({ product, shopId }: Iprop) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <Card radius="md" withBorder padding="xl" className={classes.card}>
      <Card.Section h={200}>
        <Image src={product.images[0]} height={'100%'} />
      </Card.Section>
      <Card.Section>
        <Button
          radius="0px"
          w={'100%'}
          bg={'teal'}
          rightSection={<IconArrowUpRight size={12} color="white" />}
          onClick={toggle}
        >
          View
        </Button>
        <ProductModal
          product={product}
          toggle={toggle}
          opened={opened}
          shopId={shopId}
        />
      </Card.Section>
    </Card>
  );
}
