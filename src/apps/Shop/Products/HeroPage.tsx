import { Container,  Text } from "@mantine/core";
import ProductCard from "./ProductCard";
import { IProduct } from "../../../@types/shop";
import { GetProducts } from "../../../data/shop";
import Headers from "../Header/Headers";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import ProductModal from "./ProductModal";

interface IProps {
  root: string,
  headerText: string,
}
function HeroPage({root, headerText}: IProps) {
  const [opened, {open, close}] = useDisclosure(false)
  const MockProducts = GetProducts();
  const [viewing, setVeiwing] = useState<IProduct>(MockProducts[0])
  let products = MockProducts?.map((product: IProduct, index) => (
    <ProductCard product={product} setViewing={setVeiwing} open={open} key={index}/>
  ));

  return (
    <div className="bg-slate-900 relative ">
      <Headers text = {headerText}/>
      <Container fluid className={`${root}  content-start`}>
        {products}
      </Container>
      <ProductModal opened={opened} close={close} product={viewing}/>
    </div>
  );
}

export default HeroPage;
