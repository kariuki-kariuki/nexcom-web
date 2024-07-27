// import CreateNewShop from "./CreateNewShop";
import Shopnav from './ShopNav/Shopnav';
import HeroPage from './Products/HeroPage';
// import ProductCard from "./Products/ProductCard";
// import NewProduct from "./Products/NewProduct";

function Shop() {
  return (
    <div className="flex flex-row ">
      <div className="w-1/12 hidden md:block">
        <Shopnav />
      </div>
      <div className="md:w-11/12 h-screen  overflow-scroll">
        <HeroPage root={ClassNames.root} headerText="A new way to Shops" />
        {/* <NewProduct /> */}
      </div>
    </div>
  );
}

const ClassNames: any = {
  root: 'grid grid-cols-2 md:grid-cols-4  lg:grid-cols-5 gap-4',
};

export default Shop;
