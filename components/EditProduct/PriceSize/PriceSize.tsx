import React, { useState } from 'react';
import { IconCirclePlusFilled, IconPencil } from '@tabler/icons-react';
import {
  Button,
  ButtonGroup,
  Dialog,
  Group,
  Input,
  InputWrapper,
  Text
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { SizeWithPrice } from '../../../lib/@types/product-price-size';
import { Product } from '../../../lib/@types/shop';
import classes from './PriceSize.module.css'
import { datasource } from '@/lib/common/datasource';

interface IProps {
  product: Product;
  setProduct: (updater: (product: Product) => Product) => void;
}

function PriceSize({ product, setProduct }: IProps) {
  const [size, setSize] = useState<SizeWithPrice>({ size: '', price: 0 });
  const [editSize, setEditSize] = useState<SizeWithPrice | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const handleAddSize = async () => {
    if (!size.size || size.price <= 0) {
      notifications.show({
        title: 'Error',
        color: 'red.7',
        message: "Size can't be zero"
      });
      return;
    }

    const {data, error} = await datasource.post({
      path: 'product-sizes',
      formData: { ...size, productId: product.id }
    });

    if (error) {
      notifications.show({
        title: 'Error',
        color: 'red.7',
        message: error
      });
      return;
    }

    setProduct((prevProduct) => ({
      ...prevProduct,
      product_sizes: [...prevProduct.product_sizes, size]
    }));
    notifications.show({
      title: 'Success',
      color: 'scode.8',
      message: 'Added a new Size'
    });

    setSize({ size: '', price: 0 });
  };

  const handleUpdateSize = async (id: number) => {
    if (!editSize) return;
    const {data, error} = await datasource.update(
      editSize,
      `product-sizes/${editSize.id}`
    );
    if (error) {
      notifications.show({
        title: 'Error',
        message: error,
        color: 'red.7'
      });
      return;
    }
    setProduct((prevProduct) => {
      const updatedSizes = [...prevProduct.product_sizes];

      return {
        ...prevProduct,
        product_sizes: updatedSizes.map((sizeE) => {
          if (size.id === id) return editSize;
          return sizeE;
        })
      };
    });

    notifications.show({
      title: 'Success',
      color: 'scode.8',
      message: 'Updated size correctly'
    });

    close();
  };

  const handleDeleteSize = (index: number) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      product_sizes: prevProduct.product_sizes.filter((s) => s.id !== index)
    }));
    close();
  };

  return (
    <>
      <Group pb="md">
        <InputWrapper label="Size">
          <Input
            placeholder="e.g., 2 liters"
            value={size.size}
            size='lg'
            classNames={{ input: classes.input }}
            onChange={(e) => setSize({ ...size, size: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper label="Price">
          <Input
            type="number"
            placeholder="0.0"
            value={size.price}
            size='lg'
            classNames={{input: classes.input}}
            onChange={(e) =>
              setSize({ ...size, price: parseFloat(e.target.value) || 0 })
            }
          />
        </InputWrapper>
        <Button
          mt="md"
          color="teal"
          radius="xl"
          leftSection={<IconCirclePlusFilled size={20} />}
          onClick={handleAddSize}
        >
          Add
        </Button>
      </Group>

      {product.product_sizes.length > 0 && (
        <Group>
          {product.product_sizes.map((prdSize, idx) => (
            <div key={idx}>
              <Button
                color="coco.3"
                variant=""
                rightSection={<IconPencil size={18} />}
                onClick={() => {
                  setEditSize(prdSize);
                  open();
                }}
              >
                {prdSize.size} @ {prdSize.price}
              </Button>
              <Dialog
                opened={opened}
                onClose={close}
                withCloseButton
                withBorder
              >
                <Text>Edit Size</Text>
                <Group wrap="nowrap">
                  <InputWrapper label="Size">
                    <Input
                      size="md"
                      value={editSize?.size || ''}
                      onChange={(e) =>
                        setEditSize(
                          (prev) =>
                            prev
                              ? { ...prev, size: e.target.value }
                              : { size: e.target.value, price: 0 } // Default price)
                        )
                      }
                    />
                  </InputWrapper>
                  <InputWrapper label="Price">
                    <Input
                      size="md"
                      type="number"
                      value={editSize?.price || 0}
                      onChange={(e) =>
                        setEditSize(
                          (prev) =>
                            prev
                              ? {
                                  ...prev,
                                  price: parseFloat(e.target.value) || 0
                                }
                              : {
                                  size: '',
                                  price: parseFloat(e.target.value) || 0
                                } // Provide default size
                        )
                      }
                    />
                  </InputWrapper>
                </Group>
                <ButtonGroup mt="md">
                  <Button
                    onClick={() =>
                      editSize?.id && handleUpdateSize(editSize?.id)
                    }
                  >
                    Update
                  </Button>
                  <Button color="red" onClick={() => handleDeleteSize(idx)}>
                    Delete
                  </Button>
                </ButtonGroup>
              </Dialog>
            </div>
          ))}
        </Group>
      )}
    </>
  );
}

export default PriceSize;
