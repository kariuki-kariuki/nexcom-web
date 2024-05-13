// import CreateNewShop from "./CreateNewShop";
import Shopnav from "./ShopNav/Shopnav";
import HeroPage from "./Products/HeroPage";

function Shop() {
  return (
    <div className="flex flex-row ">
      <div className="w-1/12 hidden md:block">
        <Shopnav />
      </div>
      <div className="md:w-11/12 h-screen  overflow-scroll">
        <HeroPage />
      </div>
    </div>
  );
}

export default Shop;
