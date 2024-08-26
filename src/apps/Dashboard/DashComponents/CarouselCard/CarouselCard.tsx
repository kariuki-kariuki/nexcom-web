import { Image, Card, Button } from '@mantine/core';
import { ShopProduct } from '../../../../@types/shop';
import { IconArrowUpRight } from '@tabler/icons-react';
import classes from './CarouselCard.module.css';
interface Iprop {
  product: ShopProduct;
}
export function CarouselCard({ product }: Iprop) {
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
        >
          View
        </Button>
      </Card.Section>
    </Card>
  );
}
