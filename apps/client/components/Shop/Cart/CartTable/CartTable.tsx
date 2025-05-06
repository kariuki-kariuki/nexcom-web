import cx from 'clsx';
import { useEffect, useState } from 'react';
import {
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Text,
  rem,
  Image,
  Paper,
  Flex,
  Avatar,
  useMantineColorScheme,
  TableScrollContainer
} from '@mantine/core';
import classes from './CartTable.module.css';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { CartItem } from '@/lib/@types/shop';
import { useColorScheme } from '@mantine/hooks';
import { datasource } from '@/lib/common/datasource';

interface IProps {
  cartItems: CartItem[];
  setTotal: (total: number) => void;
  setCartItems: (cartItems: CartItem[]) => void;
  selection: string[],
  setSelection: (updater: (selections: string[]) => string[]) => void;
}

export function CartTable({ cartItems, setTotal, setCartItems, selection, setSelection }: IProps) {
  const { colorScheme } = useMantineColorScheme();
  // Toggle selection of individual row
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

  // Toggle selection of all rows
  const toggleAll = () =>
    setSelection((current) =>
      current?.length === cartItems.length
        ? []
        : cartItems?.map((item) => item.id.toString())
    );

  // Calculate the total based on selected cartItems
  const calculateTotal = () => {
    const selectedItems = cartItems?.filter((cart) =>
      selection.includes(cart.id.toString())
    );
    const newTotal =
      selectedItems?.reduce((sum, cartItem) => {
        return sum + cartItem.size.price * cartItem.quantity;
      }, 0) || 0; // Default to 0 if no selection
    setTotal(newTotal);
  };

  // Recalculate total when selection or cartItems change
  useEffect(() => {
    calculateTotal();
  }, [selection, cartItems]);

  // Render table rows for each cart
  const rows = cartItems?.map((cart) => {
    const selected = selection.includes(cart?.id.toString());
    const [mycart, setMycart] = useState(cart); // Separate state for each cart

    // Update cart quantity and recalculate total
    const updatecartQuantity = async (newQuantity: number) => {
      const updatedcart = { ...mycart, quantity: newQuantity };
      setMycart(updatedcart);
      const { data } = await datasource.update(updatedcart, `carts/${cart.id}`)
      if (data) {
        const updatedcarts = cartItems.map((item) =>
          item.id === cart.id ? updatedcart : item
        );
        setCartItems(updatedcarts);
      }
    };
    return (
      <Table.Tr
        key={cart?.id}
        className={cx({
          [classes.rowSelected]: selected,
          [classes.color]: !selected
        })}

      >
        <Table.Td>
          <Checkbox
            checked={selection.includes(cart.id.toString())}
            onChange={() => toggleRow(cart.id.toString())}
          />
        </Table.Td>
        <Table.Td>
          <Group gap="sm" h={70}>
            <Avatar
              style={{ height: '100%' }}
              src={cart.product.images ? cart.product.images[0].url : ''}
              radius={'md'}
              size={'xl'}
              name={cart.product.name}
            />
          </Group>
        </Table.Td>
        <Table.Td>
          <Text size="sm" fw={500} flex={1}
            lineClamp={1}
          >
            {cart.product.name}
          </Text>
        </Table.Td>
        <Table.Td flex={1}>
          <Flex direction={{ base: 'column-reverse', sm: 'row' }} justify="center" gap="md" align="center">
            <IconMinus
              color="red"
              onClick={() => {
                if (mycart.quantity > 1) {
                  updatecartQuantity(mycart.quantity - 1);
                }
              }}
            />
            {mycart.quantity}
            <IconPlus
              color="green"
              onClick={() => updatecartQuantity(mycart.quantity + 1)}
            />
          </Flex>
        </Table.Td>
        <Table.Td>{mycart.quantity * cart.size.price}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Paper className={classes.main} bg="none">
      <TableScrollContainer maxHeight="80vh" minWidth={500}>
        <Table
          miw={400}
          verticalSpacing="lg"
          withRowBorders={true}
          stickyHeader
          striped
          classNames={{ th: classes.header }}
          stripedColor={colorScheme === 'dark' ? 'rgba(0, 0, 0, .1)' : 'rgba(0, 0, 0, .05)'}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: rem(40) }}>
                <Checkbox
                  onChange={toggleAll}
                  checked={selection.length === cartItems.length}
                  indeterminate={
                    selection.length > 0 && selection.length !== cartItems.length
                  }
                />
              </Table.Th>
              <Table.Th>Image</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Total</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </TableScrollContainer>
    </Paper>
  );
}
