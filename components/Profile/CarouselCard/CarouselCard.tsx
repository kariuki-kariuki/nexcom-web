import { Image, Card, Button } from '@mantine/core';
import { Product, Shop } from '../../../lib/@types/shop';
import { IconArrowUpRight } from '@tabler/icons-react';
import classes from './CarouselCard.module.css';

import { useDisclosure } from '@mantine/hooks';
import ProductModal from '@/components/Shop/Products/ProductModal';
import { GlobalUser } from '@/lib/@types/app';
interface Iprop {
  product: Product;
  user: GlobalUser;
  shop: Shop;
}
export function CarouselCard({ product, user, shop }: Iprop) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <Card radius="md" withBorder padding="xl" className={classes.card}>
      <Card.Section h={200}>
        <Image src={product.images[0]?.url} height={'100%'} />
      </Card.Section>
      <Card.Section>
        <Button
          radius="0px"
          w={'100%'}
          bg={'coco.4'}
          rightSection={<IconArrowUpRight size={12} color="white" />}
          onClick={toggle}
        >
          View
        </Button>
        <ProductModal
          product={product}
          toggle={toggle}
          opened={opened}
          owner={user}
          shop={shop}
        />
      </Card.Section>
    </Card>
  );
}
