import HeroPage from './Products/HeroPage';
import { Box, LoadingOverlay, Paper } from '@mantine/core';
import { NavbarNested } from './ShopNav/NavbarNested';
import classes from './Shop.module.css';
import { useFetch } from '../../hooks/useFetchHooks';
import { ProductWithShop } from '../../@types/shop';

function Shop() {
  const { isLoading, result } = useFetch<ProductWithShop[]>('products');
  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'purple', type: 'bars' }}
      />
      <Box className={classes.shop}>
        <Box className={classes.sections} bg={'none'}>
          <Paper
            w={{ sm: '30%', md: '25%' }}
            visibleFrom="sm"
            p={0}
            bg={'none'}
          >
            <NavbarNested />
          </Paper>
          <Paper w={{ base: '100%', sm: '70%', md: '75%' }} p={0} bg={'none'}>
            {result ? <HeroPage products={result} /> : ''}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default Shop;
