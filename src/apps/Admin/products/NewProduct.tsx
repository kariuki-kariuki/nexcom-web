import {
  Button,
  Card,
  Flex,
  Group,
  Image,
  Input,
  Paper,
  SimpleGrid,
  Text,
  Textarea,
} from '@mantine/core';
import { useState } from 'react';
import { FileWithPath } from '@mantine/dropzone';
import { DropzoneButton } from './DropzoneButton';
import {
  IconEyeCheck,
  IconImageInPicture,
  IconUpload,
} from '@tabler/icons-react';
import { url } from '../../../data/url';

type productColor = {
  name: string;
  image: string;
};

type Product = {
  name: string;
  description: string;
  image: string;
  colors: string;
  quantity: number;
  sizes: string;
  files: any;
};

function NewProduct() {
  const [product, setProduct] = useState<Product>({
    name: '',
    description: '',
    image: '',
    colors: '',
    quantity: 0,
    sizes: '',
    files: [],
  });

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
  const formData = new FormData();

  // Append product fields to FormData
  formData.append('name', product.name);
  formData.append('description', product.description);
  formData.append('image', product.image);
  formData.append('colors', product.colors);
  formData.append('quantity', product.quantity.toString());
  formData.append('sizes', product.sizes);

  // Append each file to FormData
  files.forEach((file, index) => {
    formData.append(`files[${index}]`, file);
  });

  console.log(files)
  const token = localStorage.getItem('token')
  try {
    // Send the form data using fetch or axios
    const response = await fetch(`${url}/products`, {
      
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
        "type": "formData"
      },
      body: formData,
    });

    if (response.ok) {
      // Handle successful response
      console.log('Product submitted successfully');
    } else {
      // Handle error response
      console.error('Product submission failed', response);
    }
  } catch (error) {
    // Handle network error
    console.error('An error occurred:', error);
  }

  };

  return (
    <Flex p="md" align={'center'} justify={'center'}>
      <Card w={{ base: '100%', sm: '75%', md: '50%' }}>
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
                    name: e.target.value,
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
                    description: e.target.value,
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
                    quantity: parseInt(e.target.value),
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
                    sizes: e.target.value,
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
                    colors: e.target.value,
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
            >
              Submit
            </Button>
            <Button
              type="submit"
              variant="outline"
              rightSection={<IconEyeCheck size={18} />}
            >
              Preview
            </Button>
          </Group>
        </form>
      </Card>
    </Flex>
  );
}

export default NewProduct;
