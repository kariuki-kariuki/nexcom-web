import { Button, Card, Group, Image, Text } from "@mantine/core";
import { IProduct } from "../../../@types/shop";
import { IconBasketPlus, IconHeartPlus } from "@tabler/icons-react";

interface Iprops {
  product: IProduct;
  setViewing: (item: IProduct) => void;
  open: () => void;
}

function ProductCard({ product, open, setViewing }: Iprops) {
  return (
    <Card withBorder shadow="sm" radius={"md"} className="" m={5}>
      <Card.Section>
        <Image src={product.image} />
      </Card.Section>
      <Card.Section withBorder inheritPadding py={"xs"}>
        <Group justify="space-between">
          <Text>{product.name}</Text>
          <IconHeartPlus size={14} color="red" />
        </Group>
      </Card.Section>
      <Card.Section inheritPadding py={"sm"}>
        <Group justify="space-between">
          <Text>Price: ${product.price}</Text>

          <IconBasketPlus
            size={20}
            color="blue"
            onClick={() => {
              open();
              setViewing(product);
            }}
          />
        </Group>
      </Card.Section>
    </Card>
  );
}

export default ProductCard;
