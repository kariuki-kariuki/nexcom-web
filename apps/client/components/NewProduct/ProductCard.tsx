import React from 'react';
import {
  Box,
  Button,
  Input,
  Paper,
  Select,
  Textarea,
  useMantineTheme
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Category, INewProduct } from '../../lib/@types/shop';
import NewCategory from './NewCategory';
import classes from './NewProduct.module.css';
import AddSize from './AddSize';

interface IproductCard {
  product: INewProduct;
  categories: Category[];
  setProduct: (updater: (product: INewProduct) => INewProduct) => void;
  setCategories: (updater: (categories: Category[]) => Category[]) => void;
}

function ProductCard({
  product,
  setProduct,
  categories,
  setCategories
}: IproductCard) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
  return (
    <>
      <Paper bg="none" pb="md">
        <Input.Wrapper
          label="Name"
          withAsterisk
        >
          <Input
            placeholder="Product Name"
            type="text"
            required
            id="name"
            c="coco.0"
            size='lg'
            classNames={{ input: classes.input }}
            name="productName"
            value={product.name}
            onChange={(e) =>
              setProduct((prevProduct) => ({
                ...prevProduct,
                name: e.target.value
              }))
            }
          />
        </Input.Wrapper>
      </Paper>
      <Paper bg={'none'} pb="md">
        <Textarea
          placeholder="Product description"
          label="Description"
          minRows={5}
          autosize
          size='lg'
          classNames={{ input: classes.input }}
          value={product.description}
          onChange={(e) =>
            setProduct((prevProduct) => ({
              ...prevProduct,
              description: e.target.value
            }))
          }
        />
      </Paper>

      <AddSize product={product} setProduct={setProduct} />
      <Paper bg={'none'} py="md">
        <Input.Wrapper
          label="Quantity of Products"
          withAsterisk
        // error="Input error"
        >
          <Input
            placeholder="0"
            type="number"
            required
            id="stock"
            size={mobile ? 'sm' : 'lg'}
            classNames={{ input: classes.input }}
            value={product.stock}
            onChange={(e) =>
              setProduct((prevProduct) => ({
                ...prevProduct,
                stock: parseInt(e.target.value, 10)
              }))
            }
          />
        </Input.Wrapper>
      </Paper>
      <Paper mb="md" className={classes.card}>
        <Select
          my="sm"
          label="Select Category"
          size={mobile ? 'sm' : 'lg'}
          classNames={{ input: classes.input }}
          value={product.category.toString()}
          onChange={(value) =>
            setProduct((prevProduct) => ({
              ...prevProduct,
              category: value || ""
            }))
          }
          data={categories.map((category) => ({
            label: category.name,
            value: category.id
          }))}
        />
        <NewCategory
          setCategories={setCategories}
        />
      </Paper>
    </>
  );
}

export default ProductCard;
