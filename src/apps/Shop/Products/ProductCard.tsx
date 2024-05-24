import { Card, Group, Image, Text } from "@mantine/core";
import { IProduct } from "../../../@types/shop";
import { IconBasketPlus, IconHeartPlus } from "@tabler/icons-react";
interface Iprops {
  product: IProduct;
  setViewing: (item: IProduct) => void;
  open: () => void;
}

function ProductCard({ product, open, setViewing }: Iprops) {
  return (
    <Card withBorder shadow="sm" radius={"md"} component="div"  m={5} styles={{root: { opacity: 1,
      backgroundColor: 'rgb(15 23 43 / var(--tw-bg-opacity))',
      }}}>
      <Card.Section>
        <Image src={product.image} />
      </Card.Section>
      <Card.Section withBorder inheritPadding py={"xs"} className="bg-slate-800">
        <Group justify="space-between">
          <Text>{product.name}</Text>
          <IconHeartPlus size={14} color="red" />
        </Group>
      </Card.Section>
      <Card.Section inheritPadding py={"sm"} className="bg-slate-900">
        <Group justify="space-between">
          <Text ><span className="hidden sm:block">Price:</span> ${product.price}</Text>

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
