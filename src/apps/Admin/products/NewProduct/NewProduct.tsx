import {
  Button,
  Card,
  Drawer,
  Group,
  Image,
  Input,
  SimpleGrid,
  Text
} from '@mantine/core';
import { useState } from 'react';
import { FileWithPath } from '@mantine/dropzone';
import { DropzoneButton } from '../DropzoneButton/DropzoneButton';
import {
  IconEyeCheck,
  IconImageInPicture,
  IconUpload
} from '@tabler/icons-react';
import { url } from '../../../../data/url';
import { Product, ShopProduct } from '../../../../../lib/@types/shop';
import { notifications } from '@mantine/notifications';
import classes from './NewProduct.module.css';
const prd = {
  name: '',
  description: '',
  image: '',
  colors: '',
  quantity: 0,
  sizes: '',
  files: [],
  price: 0.0
};

interface IDrawer {
  opened: boolean;
  toggle: () => void;
  setProducts: React.Dispatch<React.SetStateAction<ShopProduct[]>>;
}

function NewProduct({ opened, toggle, setProducts }: IDrawer) {
  const [product, setProduct] = useState<Product>(prd);

  const [files, setFiles] = useState<FileWithPath[]>([]);
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        w={100}
        h={100}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Create a new FormData object
    product.files = files;
    const formData = new FormData();

    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('image', product.image);
    formData.append('colors', product.colors);
    formData.append('quantity', product.quantity.toString());
    formData.append('sizes', product.sizes);
    formData.append('price', product.price.toString());

    // Append each file to FormData
    files.forEach((file) => {
      formData.append(`files`, file);
    });

    // console.log(files)
    const token = localStorage.getItem('token');
    try {
      // Send the form data using fetch or axios
      fetch(`${url}/products`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })
        .then((res) => res.json())
        .then((r: ShopProduct) => {
          console.log(r), setProduct(prd);
          setProducts((prev: ShopProduct[]) => {
            if (prev) {
              return [...prev, r];
            } else {
              return [r];
            }
          });
          setFiles([]);
        })
        .catch((e) => {
          console.log(e);
          notifications.show({
            title: 'Error Occured',
            color: 'red',
            message: e,
            autoClose: true
          });
        });
    } catch (error) {
      // Handle network error
      console.error('An error occurred:', error);
    }
  };

  return (
    <Drawer
      p="md"
      opened={opened}
      onClose={toggle}
      classNames={{
        content: classes.color,
        header: classes.color,
        body: classes.overlay
      }}
      position="right"
    >
      <Card w={'100%'} className={classes.card}>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input.Wrapper
              label="New Product"
              withAsterisk
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
          </div>

          <div className="mb-4">
            <Input.Wrapper
              label="Product description"
              withAsterisk
            // error="Input error"
            >
              <Input
                placeholder="Product Description"
                type="text"
                required
                id="name"
                value={product.description}
                onChange={(e) =>
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    description: e.target.value
                  }))
                }
              />
            </Input.Wrapper>
          </div>
          <div className="mb-4">
            <Input.Wrapper
              label="Price"
              withAsterisk
            // error="Input error"
            >
              <Input
                placeholder="0.0"
                type="number"
                required
                id="price"
                value={product.price}
                onChange={(e) =>
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    price: parseFloat(e.target.value)
                  }))
                }
              />
            </Input.Wrapper>
          </div>

          <div className="mb-4">
            <Group>
              <Text component="h5" fz={'xl'} fw={'bold'}>
                Product Images
              </Text>
              <IconImageInPicture />
            </Group>
            <DropzoneButton setFiles={setFiles} />
            <SimpleGrid
              cols={{ base: 1, sm: 4 }}
              mt={previews.length > 0 ? 'xl' : 0}
            >
              {previews}
            </SimpleGrid>
          </div>

          <div className="mb-4">
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
                value={product.quantity}
                onChange={(e) =>
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    quantity: parseInt(e.target.value)
                  }))
                }
              />
            </Input.Wrapper>
          </div>

          <div className="mb-4">
            <Input.Wrapper
              label="Products Sizes"
              description="comma seperated"
              withAsterisk
            // // error="Input error"
            >
              <Input
                placeholder="xl, sm, xxl"
                type="text"
                required
                id="name"
                value={product.sizes}
                onChange={(e) =>
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    sizes: e.target.value
                  }))
                }
              />
            </Input.Wrapper>
          </div>
          <div className="mb-4">
            <Input.Wrapper
              label="Product colors"
              withAsterisk
              description="comma seperated"
            // // error="Input error"
            >
              <Input
                placeholder="red, green, blue"
                type="text"
                required
                id="name"
                value={product.colors}
                onChange={(e) =>
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    colors: e.target.value
                  }))
                }
              />
            </Input.Wrapper>
          </div>

          <Group justify="center">
            <Button
              type="submit"
              variant="filled"
              rightSection={<IconUpload size={18} />}
              bg={'purple'}
            >
              Submit
            </Button>
            <Button
              type="submit"
              variant="outline"
              rightSection={<IconEyeCheck size={18} />}
              color="teal.8"
            >
              Preview
            </Button>
          </Group>
        </form>
      </Card>
    </Drawer>
  );
}

export default NewProduct;
