import React, { useState } from 'react';
import { IconTrashXFilled } from '@tabler/icons-react';
import {
  Button,
  ButtonGroup,
  Image,
  Input,
  InputWrapper,
  Modal
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { Product, ProductImage } from '../../lib/@types/shop';
import { datasource } from '@/lib/common/datasource';

interface Iprops {
  image: ProductImage;
  setProduct: (updater: (product: Product) => Product) => void;
}
function CarouselImage({ image, setProduct }: Iprops) {
  const [opened, { toggle }] = useDisclosure();
  const [imageUpdate, setImageUpdate] = useState(image);
  const handleUpdate = async () => {
    const res = await datasource.update(
      { altText: imageUpdate.altText }, `images/${image.id}`, true);
    if (!res) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update',
        color: 'red.7'
      });
      return;
    }
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: prevProduct.images.map((img) => {
        if (img.id === image.id) {
          return imageUpdate;
        }
        return img;
      })
    }));
    notifications.show({
      title: 'Succes',
      message: 'Update Successful',
      color: 'scode.8'
    });
  };

  const handleDelete = async () => {
    const {error} = await datasource.delete(`images/${image.id}`);
    if (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete Image',
        color: 'red.9'
      });
      return;
    }
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: prevProduct.images.filter((img) => img.id !== image.id)
    }));
    toggle();
    notifications.show({
      title: 'Succes',
      message: 'Deleted Image Succesfully',
      color: 'scode.8'
    });
  };
  return (
    <div>
      <Image src={image.url} alt={image.altText} onClick={toggle} />
      <Modal opened={opened} onClose={toggle} withCloseButton>
        <Image src={image.url} alt={image.altText} width="100%" height="auto" />
        <InputWrapper label="Alternative text" pt="md">
          <Input
            value={imageUpdate.altText}
            onChange={(e) =>
              setImageUpdate((prev) => ({ ...prev, altText: e.target.value }))
            }
          />
        </InputWrapper>
        <ButtonGroup py="xl">
          <Button onClick={handleUpdate}>Update</Button>
          <Button
            color="red.7"
            leftSection={<IconTrashXFilled size={18} />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Modal>
    </div>
  );
}

export default CarouselImage;
