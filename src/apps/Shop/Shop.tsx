// import CreateNewShop from "./CreateNewShop";
import HeroPage from './Products/HeroPage';
import { Box, LoadingOverlay, Paper } from '@mantine/core';
import { NavbarNested } from './ShopNav/NavbarNested';
// import ProductCard from "./Products/ProductCard";
// import NewProduct from "./Products/NewProduct";
import classes from './Shop.module.css';
import { HeaderSearch } from '../../components/Navbar/HeaderSearch/HeaderSearch';
import { useFetch } from '../../hooks/useFetchHooks';
import { ProductWithShop } from '../../@types/shop';

function Shop() {
  const { isLoading, result, error } = useFetch<ProductWithShop[]>('products');
  console.log(result);
  return (
      <Box pos="relative">
        <LoadingOverlay
           visible={isLoading}
           zIndex={1000}
           overlayProps={{ radius: 'sm', blur: 2 }}
           loaderProps={{ color: 'purple', type: 'bars' }}
        />
        <Box className={classes.shop}>
          <HeaderSearch />
          <Box className={classes.sections} bg={'none'}>
            <Paper w={'25%'} visibleFrom="sm" p={0} bg={'none'}>
              <NavbarNested />
            </Paper>
            <Paper w={{ sm: '75%' }} p={0} bg={'none'}>
              { result ? <HeroPage products={result}  /> : '' }
            </Paper>
          </Box>
        </Box>
      </Box>
  );
}

export default Shop;
