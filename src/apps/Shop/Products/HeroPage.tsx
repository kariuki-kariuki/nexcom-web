import { Flex, Grid, ScrollArea } from '@mantine/core';
import ProductCard from './ProductCard';
import { ProductWithShop } from '../../../../lib/@types/shop';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import ProductModal from './ProductModal';
import classes from './hero.module.css';
import { HeaderSearch } from '../../../components/Navbar/HeaderSearch/HeaderSearch';

interface Iprop {
  products: ProductWithShop[];
}
const links = [
  { link: '/', label: 'Home' },
  { link: '/chat', label: 'Chat' },
  { link: '/cart', label: 'Cart' }
];
function HeroPage({ products }: Iprop) {
  const [opened, { toggle }] = useDisclosure(false);
  const [viewing, setVeiwing] = useState<ProductWithShop>(products?.[0]);
  const product = products?.map((product: ProductWithShop, index) => (
    <ProductCard
      product={product}
      setViewing={setVeiwing}
      toggle={toggle}
      key={index}
    />
  ));

  return (
    <Flex className={classes.hero} mx={{ sm: 'md' }} direction={'column'}>
      <HeaderSearch links={links} />

      <ScrollArea className={classes.scroll} scrollbars="y">
        <Grid p={0} gutter={'xs'}>
          {product}
        </Grid>
      </ScrollArea>
      <ProductModal
        opened={opened}
        toggle={toggle}
        product={viewing}
        shopId={viewing?.shop.id}
      />
    </Flex>
  );
}

export default HeroPage;
