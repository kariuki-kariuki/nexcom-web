// import CreateNewShop from "./CreateNewShop";
import HeroPage from './Products/HeroPage';
import { Box, Paper } from '@mantine/core';
import { NavbarNested } from './ShopNav/NavbarNested';
// import ProductCard from "./Products/ProductCard";
// import NewProduct from "./Products/NewProduct";
import classes from './Shop.module.css';
import { HeaderSearch } from '../../components/Navbar/HeaderSearch/HeaderSearch';
function Shop() {
  return (
    <Box className={classes.shop}>
      <HeaderSearch />
      <Box className={classes.sections} bg={'none'}>
        <Paper w={'25%'} visibleFrom="sm" p={0} bg={'none'}>
          <NavbarNested />
        </Paper>
        <Paper w={{ sm: '75%' }} p={0} bg={'none'}>
          <HeroPage />
        </Paper>
      </Box>
    </Box>
  );
}

export default Shop;
