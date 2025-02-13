import React, { useState } from 'react';
import { IconCirclePlusFilled, IconX } from '@tabler/icons-react';
import { Button, Group, Input } from '@mantine/core';
import { INewProduct } from '../../lib/@types/shop';
import { SizeWithPrice } from '../../lib/@types/product-price-size';
import classes from './NewProduct.module.css'
interface IAddSize {
  product: INewProduct;
  setProduct: (updater: (product: INewProduct) => INewProduct) => void;
}
function AddSize({ product, setProduct }: IAddSize) {
  const [size, setSize] = useState<SizeWithPrice>({ size: '', price: 0 });

  return (
    <>
      <Group pb="md" justify="space-between">
        <Input.Wrapper
          label="Size"
          // error="Input error"
        >
          <Input
            placeholder="2l"
            type="text"
            id="size"
            size='lg'
            value={size.size}
            classNames={{ input: classes.input }}
            onChange={(e) =>
              setSize((prevProduct) => ({
                ...prevProduct,
                size: e.target.value
              }))
            }
          />
        </Input.Wrapper>
        <Input.Wrapper label="Price">
          <Input
            placeholder="0.0"
            type="number"
            size='lg'
            id="price"
            classNames={{ input: classes.input }}
            value={size.price}
            onChange={(e) =>
              setSize((prevSize) => ({
                ...prevSize,
                price: parseFloat(e.target.value)
              }))
            }
          />
        </Input.Wrapper>
        <Button
          mt="md"
          color="teal.9"
          radius="xl"
          leftSection={<IconCirclePlusFilled color="white" size={20} />}
          onClick={() => {
            if (size.price !== 0 || size.size !== '') {
              setProduct((prevProduct) => ({
                ...prevProduct,
                sizes: [...prevProduct.sizes, size]
              }));
            }
          }}
        >
          Add
        </Button>
      </Group>
      {product.sizes.length !== 0 && (
        <Group>
          {product.sizes.map((prdSize, idx) => (
            <Button
              key={idx}
              color="orange.7"
              c="dimmed"
              variant="outline"
              rightSection={<IconX size={14} color="red" />}
              onClick={() =>
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  sizes: prevProduct.sizes.filter((item) => item !== prdSize)
                }))
              }
            >
              {prdSize.size} @ {prdSize.price}
            </Button>
          ))}
        </Group>
      )}
    </>
  );
}

export default AddSize;
