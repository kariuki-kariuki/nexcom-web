import React, { useState } from 'react';
import { IconTrashXFilled } from '@tabler/icons-react';
import {
  Avatar,
  Button,
  ButtonGroup,
  Image,
  Input,
  InputWrapper,
  Modal
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { ImageInterface, Product } from '@repo/nexcom-types';
import { datasource } from '@repo/shared-logic';

interface Iprops {
  image: ImageInterface;
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
      color: 'coco.0'
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
      color: 'coco.0'
    });
  };
  return (
    <div>
      <Avatar h="auto" radius={0} w="100%" src={image.signedUrl} alt={image.altText} onClick={toggle} />
      <Modal opened={opened} onClose={toggle} withCloseButton>
      <Avatar h="auto" radius={0} w="100%" src={image.signedUrl} alt={image.altText} onClick={toggle} />
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
