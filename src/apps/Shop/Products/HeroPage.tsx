import { Container, Input, Text } from "@mantine/core";
import ProductCard from "./ProductCard";
import { IProduct } from "../../../@types/shop";
import { GetProducts } from "../../../data/shop";
import Headers from "../Header/Headers";

function HeroPage() {
  let products = GetProducts()?.map((product: IProduct) => (
    <ProductCard product={product} />
  ));

  return (
    <div className="p-5">
      <Text className="text-center" component="h1"> REINVENTING YOUR SHOPING EXPERINSE SHOP </Text>
      <Headers />
      <Container fluid className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-5 gap-4 content-start">
        {products}
      </Container>
    </div>
  );
}

export default HeroPage;
