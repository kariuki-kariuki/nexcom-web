import { useState } from 'react';
import Link from 'next/link';
import {
  IconArchive,
  IconCheckbox,
  IconDots,
  IconNotesOff,
  IconPencil,
  IconTrash
} from '@tabler/icons-react';
import {
  Avatar,
  Button,
  Divider,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  rem,
  Table,
  Text
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Product, ProductStatus } from '../../lib/@types/shop';
import { Delete, update } from '../../lib/hooks/useFetchHooks';
import classes from './Products.module.css';

interface IRow {
  prd: Product;
  setProducts: (updater: (products: Product[]) => Product[]) => void;
}

export function Row({ prd, setProducts }: IRow) {
  const [product, setPrd] = useState(prd);
  const date = new Date(product.created_at);
  const handleDelete = async (id: number) => {
    const res = await Delete(`products/${id}`);
    if (res) {
      notifications.show({
        title: 'Success',
        message: `Succefully deleted ${product.name}`,
        color: 'scode.8'
      });
      setProducts((prevProducts) =>
        prevProducts.filter((item) => item.id !== id)
      );
    } else {
      notifications.show({
        title: 'Failed',
        color: 'red.9',
        message: `Failed to delete ${product.name}`
      });
    }
  };

  async function handleUpdate(params: ProductStatus) {
    const res = await update({
      resource: `products/${product.id}`,
      formData: { status: params }
    });
    if (res) {
      notifications.show({
        title: 'Success',
        message: `Succefully updated ${product.name} status to ${params}`,
        color: 'scode.8'
      });
      setPrd((prevProduct) => ({ ...prevProduct, status: params }));
      setProducts((prevProducts) =>
        prevProducts.map((productX) => {
          if (productX.id === product.id) {
            return { ...product, status: params };
          }
          return productX;
        })
      );
    } else {
      notifications.show({
        title: 'Failed',
        message: `Failed to updat ${product.name} status to ${params}`,
        color: 'orange.7'
      });
    }
  }
  return (
    <Table.Tr>
      <Table.Td>
        <Group gap="sm" wrap="nowrap">
          <Avatar size={50} src={product.images[0].url} radius="md" />
          <Text size="sm" fw={500}>
            {product.name}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Button
          color={
            product.status === ProductStatus.PUBLISHED
              ? 'teal.9'
              : product.status === ProductStatus.DRAFT
                ? 'orange.9'
                : 'red.9'
          }
          radius="lg"
          fullWidth
        >
          {product.status}
        </Button>
      </Table.Td>
      <Table.Td>
        <Text>{product.product_sizes[0].price} </Text>
      </Table.Td>
      <Table.Td>
        <Text c="dimmed" size="sm">
          {`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`}
        </Text>
      </Table.Td>
      <Table.Td>
        <Menu classNames={{ dropdown: classes.menu }} trigger="click-hover">
          <MenuTarget>
            <IconDots />
          </MenuTarget>
          <MenuDropdown>
            <Link
              href={`products/edit/${product.id}`}
              style={{ textDecoration: 'none' }}
            >
              <MenuItem
                leftSection={
                  <IconPencil style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Edit
              </MenuItem>
            </Link>
            {!(product.status === ProductStatus.PUBLISHED) && (
              <MenuItem
                leftSection={
                  <IconCheckbox style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => handleUpdate(ProductStatus.PUBLISHED)}
              >
                Publish
              </MenuItem>
            )}
            {!(product.status === ProductStatus.ARCHIVED) && (
              <MenuItem
                leftSection={
                  <IconArchive style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => handleUpdate(ProductStatus.ARCHIVED)}
              >
                Archive
              </MenuItem>
            )}
            {(product.status === ProductStatus.PUBLISHED ||
              product.status === ProductStatus.ARCHIVED) && (
              <MenuItem
                leftSection={
                  <IconNotesOff style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => handleUpdate(ProductStatus.DRAFT)}
              >
                Draft
              </MenuItem>
            )}
            <Divider />
            <MenuLabel>Danger</MenuLabel>
            <MenuItem
              color="red"
              leftSection={
                <IconTrash style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={async () => handleDelete(product.id)}
            >
              Delete
            </MenuItem>
          </MenuDropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  );
}
