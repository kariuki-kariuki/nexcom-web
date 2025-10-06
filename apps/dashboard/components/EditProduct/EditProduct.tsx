'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconImageInPicture } from '@tabler/icons-react';
import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Group,
  Input,
  LoadingOverlay,
  Paper,
  Select,
  Text,
  Textarea
} from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { Category, ImageInterface, Product } from '@repo/nexcom-types';
import Previews from '../Previews/Previews';
import { createImage } from './create';
import PriceSize from './PriceSize/PriceSize';
import classes from './EditProduct.module.css';
import { datasource } from '@repo/shared-logic';
import { DropzoneButton } from '../Admin/products/DropzoneButton/DropzoneButton';
import { ProductCorousel } from '../ImageCarousel/ImageCarousel';

function EditProduct({
  productEdit, categories
}: {
  productEdit: Product;
  categories: Category[];
}) {
  const [product, setProduct] = useState<Product>(productEdit);
  const [opened, { toggle }] = useDisclosure();
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleCreate = async () => {
    setLoading((prevState) => !prevState);
    const formData = new FormData();
    formData.append('productId', product.id.toString());
    files.forEach((file) => {
      formData.append('files', file);
    });
    const res = await createImage<ImageInterface[]>({
      resource: 'images',
      formData
    });
    if (typeof res === 'string') {
      setLoading((prevState) => !prevState);
      notifications.show({
        message: res,
        title: 'Error',
        color: 'red'
      });
    } else {
      setLoading((prevState) => !prevState);
      setFiles([]);
      toggle();
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: [...prevProduct.images, ...res]
      }));
    }
  };
  const handleUpdate = async () => {
    setLoading((prevState) => !prevState);
    const { data, error } = await datasource.update<Product>(product,
      `products/${product.id}`);
    if (error) {
      setLoading((prevState) => !prevState);
      notifications.show({
        title: 'Error',
        message: 'Failed to update'
      });
    }
    if (data && !error) {
      setLoading(false);
      notifications.show({
        title: 'Sucess',
        message: 'Updated succesfuly'
      });
      router.push('/dashboard/products');
    }
    setLoading(false);
  };
  return (
    <div>
      <Paper bg='none' className={classes.main}>
        <LoadingOverlay
          visible={loading}
          loaderProps={{ type: 'bars', color: 'teal.9' }}
        />
        <Dialog
          opened={opened}
          radius="md"
          size="xl"
          onClose={toggle}
          withCloseButton
        >
          <div>
            <DropzoneButton setFiles={setFiles} />
            <Previews files={files} setFiles={setFiles} />
            {files.length > 0 && (
              <Button my="md" onClick={handleCreate}>
                Upload
              </Button>
            )}
          </div>
        </Dialog>
        <Group justify="space-between" pb="sm" pr="sm">
          <Text fw="bold" style={{ flex: 1 }}>
            Name: {product.name}
          </Text>
          <Group>
            <Button variant="filled" size='lg' color="teal" onClick={handleUpdate}>
              Update
            </Button>
          </Group>
        </Group>
        <Card w="100%" className={classes.card} withBorder radius="md" shadow="lg">
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            gap="md"
            p={{ base: '0px', sm: 'lg' }}
            mih={{ base: 'fit-content', sm: '70vh' }}
          >
            <Paper bg={'none'} w={{ base: '100%', sm: '50%' }}>
              <Card shadow="lg" className={classes.card} h="100%">
                <Group justify="space-between" py="md">
                  <Text my="md" component="h5" fz="xl" fw="bold">
                    Images
                  </Text>

                </Group>
                <Paper bg={'none'} h={"70vh"}>
                  <ProductCorousel
                    images={product.images}
                    toggle={toggle}
                    setProduct={setProduct}
                  />
                </Paper>
                <Button
                  color="coco.4"
                  size='lg'
                  leftSection={<IconImageInPicture size={18} color="white" />}
                  onClick={toggle}
                >
                  Add Image
                </Button>
              </Card>
            </Paper>
            <Paper bg={'none'} w={{ base: '100%', sm: '70%' }}>
              <Paper bg={'none'} pb="md">
                <Input.Wrapper
                  label="Name"
                // // error="Input error"
                >
                  <Input
                    placeholder="Product Name"
                    type="text"
                    required
                    id="name"
                    classNames={{ input: classes.input }}
                    size='lg'
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
                  classNames={{ input: classes.input }}
                  minRows={4}
                  autosize
                  size='lg'
                  onChange={(e) =>
                    setProduct((prevProduct) => ({
                      ...prevProduct,
                      description: e.target.value
                    }))
                  }
                  value={product.description}
                />
              </Paper>

              {/* product price */}
              <PriceSize product={product} setProduct={setProduct} />

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
                    id="name"
                    classNames={{ input: classes.input }}
                    size='lg'
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
              <Select
                my="sm"
                label="Select Category"
                size='lg'
                classNames={{ input: classes.input }}
                value={product.category.id}
                onChange={(_value, option) =>
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    category: { name: option.label, id: option.value }
                  }))
                }
                data={categories.map((category) => ({
                  label: category.name,
                  value: category.id
                }))}
              />
            </Paper>
          </Flex>
        </Card>
      </Paper>
    </div>
  );
}

export default EditProduct;
