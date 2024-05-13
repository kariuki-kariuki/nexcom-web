import { Badge, Button, Card, Group, Image, Modal, Text } from "@mantine/core";
import  { useState } from "react";
import { IProduct } from "../../../@types/shop";

interface Iprops {
  opened: boolean;
  close: () => void;
  product: IProduct;
}

function ProductModal({ opened, close, product }: Iprops) {
  const [quantity, setQuantity] = useState(1);
  return (
    <Modal
      opened={opened}
      onClose={close}
      withCloseButton={false}
      className="p-5"
      size={"auto"}
    >
      <div className="grid grid-cols-2 p-5 h-full">
        <Card p={"xl"}>
          <Card.Section className="flex content-center">
            <Image
              src={product.image}
              h={"70%"}
              w={"100%"}
              fit="contain"
              radius={"20px"}
            />
          </Card.Section>
        </Card>
        <Card className="p-5 h-full flex content-center" p={"xl"}>
          <Card.Section className="p-5">
            <Text className="text-center">{product.name}</Text>
          </Card.Section>
          <Card.Section py={"xl"}>
          <p  className="text-slate-200 font-mono">
              Product Description
            </p>
            <Text fz={"sm"} className="text-slate-500 font-serif">
              {product.description}
            </Text>
            <Text> Price: ${product.price}</Text>
          </Card.Section>
          <Card.Section py={"xl"}>
            <Group>
              <Badge color="pink.4" variant="filled">
                Lime filled
              </Badge>

              <Badge color="orange" variant="light">
                Orange light
              </Badge>

              <Badge variant="danger">Danger</Badge>
            </Group>
          </Card.Section>
          <Card.Section>
            <Group justify="space-between" pr={"xl"}>
              <Button.Group py={"xl"}>
                <Button
                  variant="default"
                  bg="pink"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                >
                  -
                </Button>
                <Button variant="default">{quantity}</Button>
                <Button
                  variant="default"
                  bg="orange"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </Button.Group>
              <Text>Total {parseInt(product.price) * quantity}</Text>
            </Group>
          </Card.Section>
        </Card>
      </div>
    </Modal>
  );
}

export default ProductModal;
