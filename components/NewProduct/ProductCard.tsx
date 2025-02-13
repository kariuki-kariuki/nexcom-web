import React from 'react';
import {
  Box,
  Button,
  Card,
  Input,
  Select,
  Text,
  Textarea
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Category } from '../../lib/@types/category';
import { INewProduct } from '../../lib/@types/shop';
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
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <>
      <Box pb="md">
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
      </Box>
      <Box pb="md">
        <Textarea
          placeholder="Product description"
          label="Description"
          minRows={3}
          size='lg'
          maxRows={4}
          classNames={{ input: classes.input }}
          value={product.description}
          onChange={(e) =>
            setProduct((prevProduct) => ({
              ...prevProduct,
              description: e.target.value
            }))
          }
        />
      </Box>

      <AddSize product={product} setProduct={setProduct} />
      <Box py="md">
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
            size='lg'
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
      </Box>
      <Box mb="md" className={classes.card}>
        <Select
          my="sm"
          label="Select Category"
          size='lg'
          classNames={{input: classes.input}}
          value={product.category.toString()}
          onChange={(_value, option) =>
            setProduct((prevProduct) => ({
              ...prevProduct,
              category: option.value
            }))
          }
          data={categories.map((category) => ({
            label: category.name,
            value: category.id.toString()
          }))}
        />
        <Button w="fit-content" radius="xl" color='coco.3' size='lg' onClick={toggle}>
          Add New Category
        </Button>
        <NewCategory
          opened={opened}
          toggle={toggle}
          setCategories={setCategories}
        />
      </Box>
    </>
  );
}

export default ProductCard;
