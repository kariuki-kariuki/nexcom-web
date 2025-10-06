'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Group,
  LoadingOverlay,
  Paper,
  Text
} from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import Previews from '../Previews/Previews';
import ProductCard from './ProductCard';
import classes from './NewProduct.module.css';
import { Category, INewProduct, ProductStatus } from '@repo/nexcom-types';
import { datasource } from '@repo/shared-logic';
import { DropzoneButton } from '../Admin/products/DropzoneButton/DropzoneButton';



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

    console.log(formData.get('sizes'))

    const { data, error, loading } = await datasource.post({formData, path: 'products', contentType: false})
    setLoading(loading)
    if (data && !loading) {
      setLoading((prevState) => !prevState);
      setProduct({
        name: '',
    description: '',
    category: categories[0].id.toString(),
    sizes: [],
    files: [],
    status: ProductStatus.DRAFT,
    stock: 0
      });
      setFiles([]);
    }
    if (error && !loading) {
      notifications.show({
        title: 'Error',
        message: error,
        color: 'red.9'
      });
    }
    setLoading(false);
  }
  return (
    <div>
      <LoadingOverlay
        visible={loading}
        loaderProps={{ color: 'coco.0', type: 'oval' }}
      />
      <form onSubmit={handleSubmit} className={classes.form}>
        <Group justify="space-between" pb="sm">
          <Text fw="bold">Create New Product</Text>
          <Group>
            <Button
              variant={
                product.status === ProductStatus.DRAFT ? 'outline' : 'default'
              }
              color="coco.4"
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
        <Card w="100%" withBorder radius="md" shadow="lg" className={classes.card}>
            <Container bg="none" w={{ base: '100%', sm: '60%' }}>
              {/* 
              - Add product details like name etc.
               */}
              <ProductCard
                product={product}
                setCategories={setCategories}
                setProduct={setProduct}
                categories={categories}
              />
             
              <Card shadow="lg" className={classes.card} h="100%" p={0}>
               {files.length < 1 &&  <DropzoneButton setFiles={setFiles} /> }
                <Previews files={files} setFiles={setFiles} />
              </Card>
            </Container>
        </Card>
      </form>
    </div>
  );
}

export default NewProduct;
