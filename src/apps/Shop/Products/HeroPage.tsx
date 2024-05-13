import { Container,  Text } from "@mantine/core";
import ProductCard from "./ProductCard";
import { IProduct } from "../../../@types/shop";
import { GetProducts } from "../../../data/shop";
import Headers from "../Header/Headers";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import ProductModal from "./ProductModal";

function HeroPage() {
  const [opened, {open, close}] = useDisclosure(false)
  const MockProducts = GetProducts();
  const [viewing, setVeiwing] = useState<IProduct>(MockProducts[0])
  let products = MockProducts?.map((product: IProduct) => (
    <ProductCard product={product} setViewing={setVeiwing} open={open}/>
  ));

  return (
    <div className="p-5">
      <Text className="text-center" component="h1"> REINVENTING YOUR SHOPING EXPERINSE SHOP </Text>
      <Headers />
      <Container fluid className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-5 gap-4 content-start">
        {products}
      </Container>
      <ProductModal opened={opened} close={close} product={viewing}/>
    </div>
  );
}

export default HeroPage;
