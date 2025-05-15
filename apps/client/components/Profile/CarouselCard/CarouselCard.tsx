import { Image, Card, Button, Avatar } from '@mantine/core';
import { Product, Shop } from '../../../lib/@types/shop';
import { IconArrowUpRight } from '@tabler/icons-react';
import classes from './CarouselCard.module.css';

import { useDisclosure } from '@mantine/hooks';
import { GlobalUser } from '@/lib/@types/app';
import Link from 'next/link';
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
        <Avatar w="100%" radius="none" variant='transparent' src={product.images[0]?.signedUrl} h={'100%'} />
      </Card.Section>
      <Card.Section>
        <Link href={`/business/product/${product.id}`}>
          <Button
            radius="0px"
            w={'100%'}
            bg={'coco.4'}
            rightSection={<IconArrowUpRight size={12} color="white" />}
            onClick={toggle}
          >
            View
          </Button>
        </Link>
      </Card.Section>
    </Card>
  );
}
