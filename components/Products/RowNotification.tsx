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
  Divider,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  Notification,
  rem,
  Stack,
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

export function RowNotification({ prd, setProducts }: IRow) {
  const [product, setPrd] = useState(prd);
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
    <Notification
      title={product.name}
      withCloseButton={false}
      color={
        product.status === ProductStatus.PUBLISHED
          ? 'teal.9'
          : product.status === ProductStatus.DRAFT
            ? 'orange.9'
            : 'red.9'
      }
      mb="xs"
    >
      <div>
        <Group gap="sm" wrap="nowrap" justify="space-between">
          <Avatar size={70} src={product.images[0].url} radius="md" />
          <Stack w="60%">
            <Text size="sm" fw={500} lineClamp={1}>
              {product.description}
            </Text>
            <Text>{product.product_sizes[0].price} </Text>
          </Stack>
          <div>
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
                      <IconCheckbox
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                    onClick={() => handleUpdate(ProductStatus.PUBLISHED)}
                  >
                    Publish
                  </MenuItem>
                )}
                {!(product.status === ProductStatus.ARCHIVED) && (
                  <MenuItem
                    leftSection={
                      <IconArchive
                        style={{ width: rem(14), height: rem(14) }}
                      />
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
                      <IconNotesOff
                        style={{ width: rem(14), height: rem(14) }}
                      />
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
          </div>
        </Group>
      </div>
    </Notification>
  );
}
