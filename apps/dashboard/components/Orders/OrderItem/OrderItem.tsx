import { Group, Flex, Text } from "@mantine/core";
import classes from "./OrderItem.module.css";

interface OrderItemProp {
    name: string,
    quantity: number,
    addOn?: string,
    price: number,
}

const OrderItem = ({ name, quantity, addOn, price }: OrderItemProp) => (
  <Group justify="space-between" py="xs">
    <Flex gap="xs" align="center">
      <div className={classes.itemImage} />
      <div>
        <Text size="sm" fw={500}>{name}</Text>
        <Text size="xs" c="dimmed">x{quantity} {addOn && `with ${addOn}`}</Text>
      </div>
    </Flex>
    <Text size="sm">€{price.toFixed(2)}</Text>
  </Group>
);

export default OrderItem