'use client';

import { useState } from 'react';
import { IconImageInPicture } from '@tabler/icons-react';
import {
  Box,
  Button,
  Card,
  Flex,
  Group,
  LoadingOverlay,
  Text
} from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import { Category } from '../../lib/@types/category';
import { INewProduct, ProductStatus } from '../../lib/@types/shop';
import { API_URL } from '../../lib/common/constans';
import { DropzoneButton } from '../DropzoneButton/DropzoneButton';
import Previews from '../Previews/Previews';
import SimpleRoute from '../SimpleRoute/SimpleRoute';
import ProductCard from './ProductCard';
import classes from './NewProduct.module.css';

const prd: INewProduct = {
  name: '',
  description: '',
  category: '1',
  sizes: [],
  files: [],
  status: ProductStatus.DRAFT,
  stock: 0
};

function NewProduct({ categoriesdb }: { categoriesdb: Category[] | null }) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(categoriesdb ?? []);
  const [product, setProduct] = useState<INewProduct>({
    name: '',
    description: '',
    category: categories[0].id.toString(),
    sizes: [],
    files: [],
    status: ProductStatus.DRAFT,
    stock: 0
  });
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Create a new FormData object
    if (product.sizes.length < 1) {
      notifications.show({
        title: 'Error',
        message: 'Provide Sizes',
        color: 'red.9',
        position: 'top-center'
      });
      return;
    }
    if (files.length < 1) {
      notifications.show({
        title: 'Error',
        message: 'Provide Images',
        color: 'red.9',
        position: 'top-center'
      });
      return;
    }
    setLoading((prevState) => !prevState);
    product.files = files;
    const formData = new FormData();

    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('sizes', JSON.stringify(product.sizes));
    formData.append('category', product.category.toString());
    formData.append('status', product.status.toString());
    formData.append('stock', product.stock.toString());
    // Append each file to FormData
    files.forEach((file) => {
      formData.append('files', file);
    });
    // console.log(product);
    const token = localStorage.getItem('token');
    try {
      // Send the form data using fetch or axios
      fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }).then((res) => {
        if (res.ok) {
          res.json().then(() => {
            setLoading((prevState) => !prevState);
            setProduct(prd);
            setFiles([]);
          });
        } else {
          res.json().then(() => {
            setLoading((prevState) => !prevState);

            notifications.show({
              title: 'Error',
              message: 'Failed to create',
              color: 'red.9'
            });
          });
        }
      });
    } catch (error) {
      // Handle network error
      setLoading((prevState) => !prevState);

      alert('An network error occurred, please try again');
    }
  };

  return (
    <Box px="md">
      <LoadingOverlay
        visible={loading}
        loaderProps={{ color: 'scode.8', type: 'oval' }}
      />
      <SimpleRoute tag="New Product" main="Products" />
      <form onSubmit={handleSubmit}>
        <Group justify="space-between" pb="sm">
          <Text fw="bold">Create New Product</Text>
          <Group>
            <Button
              variant={
                product.status === ProductStatus.DRAFT ? 'outline' : 'default'
              }
              color="orange.7"
              type="submit"
              onClick={() =>
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  status: ProductStatus.DRAFT
                }))
              }
            >
              Draft
            </Button>
            <Button
              type="submit"
              variant={
                product.status === ProductStatus.PUBLISHED
                  ? 'outline'
                  : 'default'
              }
              color="orange.7"
              onClick={() =>
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  status: ProductStatus.PUBLISHED
                }))
              }
            >
              Publish
            </Button>
          </Group>
        </Group>
        <Card w="100%" bg="none" withBorder radius="md" shadow="lg">
          <Flex
            gap="md"
            direction={{ base: 'column', sm: 'row' }}
            p="lg"
            mih="75vh"
          >
            <Box w={{ base: '100%', sm: '60%' }}>
              <ProductCard
                product={product}
                setCategories={setCategories}
                setProduct={setProduct}
                categories={categories}
              />
            </Box>
            <Box w={{ base: '100%', sm: '40%' }}>
              <Card shadow="lg" className={classes.card} h="100%">
                <Group justify="center">
                  <Text component="h5" fz="xl" fw="bold" ta="center">
                    Product Images
                  </Text>
                  <IconImageInPicture />
                </Group>
                <DropzoneButton setFiles={setFiles} />
                <Previews files={files} setFiles={setFiles} />
              </Card>
            </Box>
          </Flex>
        </Card>
      </form>
    </Box>
  );
}

export default NewProduct;
