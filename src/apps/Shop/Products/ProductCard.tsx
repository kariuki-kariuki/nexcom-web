import { Button, Card, Group, Image, Text } from "@mantine/core";
import { IProduct } from "../../../@types/shop";

interface Iprops {
    product: IProduct
}

function ProductCard({product}: Iprops) {
  return (
    <Card withBorder shadow="sm" radius={"md"} className="" m={5}>
      
      <Card.Section>
        <Image src={product.image} />
      </Card.Section>
      <Card.Section withBorder inheritPadding py={"xs"}>
        <Group>
          <Text>{product.name}</Text>
        </Group>
      </Card.Section>
      <Card.Section p={"sm"}>
        <Group>
          <Button radius={"xl"}>Buy</Button>
          <Button radius={"xl"} bg={"pink"}>
            <Text className="font-mono text-sm">${product.price}</Text>
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}

export default ProductCard;
