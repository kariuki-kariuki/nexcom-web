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
  NativeSelect,
  Text,
  Textarea
} from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { Category } from '../../lib/@types/category';
import { Product, ProductImage } from '../../lib/@types/shop';
import { update } from '../../lib/hooks/useFetchHooks';
import { DropzoneButton } from '../DropzoneButton/DropzoneButton';
import { ProductCorousel } from '../ImageCarousel/ImageCarousel';
import Previews from '../Previews/Previews';
import SimpleRoute from '../SimpleRoute/SimpleRoute';
import { createImage } from './create';
import PriceSize from './PriceSize/PriceSize';
import classes from './EditProduct.module.css';

function EditProduct({
  productEdit
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
    // Append each file to FormData
    formData.append('productId', product.id.toString());
    files.forEach((file) => {
      formData.append('files', file);
    });
    const res = await createImage<ProductImage[]>({
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
    product.category = product.category.toString();
    const res = await update({
      resource: `products/${product.id}`,
      formData: product
    });
    if (res) {
      setLoading((prevState) => !prevState);
      notifications.show({
        title: 'Sucess',
        message: 'Updated succesfuly'
      });
      router.push('/products');
    }
    setLoading((prevState) => !prevState);
  };
  return (
    <Box p="sm">
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
      <SimpleRoute tag={`Edit Product ${product.id}`} main="Products" />
      <Group justify="space-between" pb="sm" pr="sm">
        <Text fw="bold" style={{ flex: 1 }}>
          Name: {product.name}
        </Text>
        <Group>
          <Button variant="default" onClick={handleUpdate}>
            Update
          </Button>
        </Group>
      </Group>
      <Card w="100%" bg="none" withBorder radius="md" shadow="lg">
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap="md"
          p={{ base: '0px', sm: 'lg' }}
          mih={{ base: 'fit-content', sm: '70vh' }}
        >
          <Box w={{ base: '100%', sm: '50%' }}>
            <Card shadow="lg" className={classes.card} h="100%">
              <Group justify="space-between" py="md">
                <Text my="md" component="h5" fz="xl" fw="bold">
                  Images
                </Text>
                <Button
                  color="scode.8"
                  leftSection={<IconImageInPicture size={18} color="white" />}
                  onClick={toggle}
                >
                  Add Image
                </Button>
              </Group>
              <ProductCorousel
                images={product.images}
                toggle={toggle}
                setProduct={setProduct}
              />
            </Card>
          </Box>
          <Box w={{ base: '100%', sm: '50%' }}>
            <Box pb="md">
              <Input.Wrapper
                label="Name"
                // // error="Input error"
              >
                <Input
                  placeholder="Product Name"
                  type="text"
                  required
                  id="name"
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
                minRows={4}
                maxRows={7}
                onChange={(e) =>
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    description: e.target.value
                  }))
                }
                value={product.description}
              />
            </Box>

            {/* product price */}
            <PriceSize product={product} setProduct={setProduct} />

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
                  id="name"
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
            <Card mb="md" className={classes.card} shadow="lg">
              <Text c="dimmed" fw="bold">
                Category
              </Text>
              <NativeSelect
                my="sm"
                label="Select Category"
                data={['Modern Cookers', ' Biomass Products', 'LPG']}
              />
            </Card>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
}

export default EditProduct;
