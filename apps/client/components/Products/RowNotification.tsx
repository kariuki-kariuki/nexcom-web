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
import classes from './Products.module.css';
import { datasource } from '@/lib/common/datasource';

interface IRow {
  prd: Product;
  setProducts: (updater: (products: Product[]) => Product[]) => void;
  index: number
}

export function RowNotification({ prd, setProducts,index }: IRow) {
  const [product, setPrd] = useState(prd);
  const handleDelete = async (id: string) => {
      const { data, error } = await datasource.delete(`products/${id}`);
      if (data && !error) {
        notifications.show({
          title: 'Success',
          message: `Succefully deleted ${product.name}`,
          color: 'teal.8'
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
      const { data, error } = await datasource.update<Product>(
        { status: params }, `products/${product.id}`
      );
      if(product.images.length < 1 && params === ProductStatus.PUBLISHED){
        notifications.show({
          title: 'Failed',
          message: `You cann't publish a product without images `,
          color: 'red.7',
        });
        return;
      }
      if (data) {
        notifications.show({
          title: 'Success',
          message: `Succefully updated ${product.name} status to ${data.status}`,
          color: 'teal.8'
        });
        setPrd((prevProduct) => ({ ...prevProduct, status: data.status }));
        setProducts((prevProducts) =>
          prevProducts.map((productX) => {
            if (productX.id === product.id) {
              return { ...product, status: data.status };
            }
            return productX;
          })
        );
      } else if(error) {
        notifications.show({
          title: 'Failed',
          message: `Failed to update ${product.name} status to ${params}`,
          color: 'orange.7'
        });
      }
    }
  return (
    <Notification
      withCloseButton={false}
      color={
        product.status === ProductStatus.PUBLISHED
          ? 'teal.9'
          : product.status === ProductStatus.DRAFT
            ? 'orange.9'
            : 'red.9'
      }
      classNames={{ root: classes.notification, body: classes.notification }}
      data-active={index % 2 === 0}
    >
        <Group gap="sm" wrap="nowrap" justify="space-between" className={classes.notification} data-active={index % 2 === 0}>
          <Avatar size={70} src={product.images[0]?.signedUrl} name={product.name} radius="md" />
          <Stack w="60%">
            <Text>{product.name}</Text>
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
                  href={`/dashboard/products/edit/${product.id}`}
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
    </Notification>
  );
}
