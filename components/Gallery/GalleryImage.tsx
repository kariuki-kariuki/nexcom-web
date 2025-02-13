import React, { useState } from 'react';
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
import { IconTrashXFilled } from '@tabler/icons-react';
import { IGallery, ImageGallery } from '../../lib/@types/gallery';
import { datasource } from '@/lib/common/datasource';

interface Iprops {
  image: ImageGallery;
  setGalleries: (updater: (gal: IGallery[]) => IGallery[]) => void;
}
function GalleryImage({ image, setGalleries }: Iprops) {
  const [opened, { toggle }] = useDisclosure();
  const [imageUpdate, setImageUpdate] = useState(image);
  const handleUpdate = async () => {
    const {error} = await datasource.update({ altText: imageUpdate.altText },
      `gallery-images/${image.id}` 
    );
    if (error) {
      notifications.show({
        title: 'Error',
        message: error,
        color: 'red.7'
      });
      return;
    }
    setGalleries((prevGalla) =>
      prevGalla.map((gallery) => ({
        ...gallery,
        images: gallery.images.map((img) =>
          img.id === imageUpdate.id ? imageUpdate : img
        )
      }))
    );
    notifications.show({
      title: 'Succes',
      message: 'Update Successful',
      color: 'coco.0'
    });
  };

  const handleDelete = async () => {
    const {error}= await datasource.delete(`gallery-images/${image.id}`);
    if (error) {
      notifications.show({
        title: 'Error',
        message: error,
        color: 'red.9'
      });
      return;
    }
    setGalleries((prevGalla) =>
      prevGalla.map((gallery) => ({
        ...gallery,
        images: gallery.images.filter((img) => img.id !== image.id)
      }))
    );
    toggle();
    notifications.show({
      title: 'Succes',
      message: 'Deleted Image Succesfully',
      color: 'coco.0'
    });
  };
  return (
    <div>
      <Image
        src={image.url}
        alt={image.altText}
        width="100%"
        height={200}
        onClick={toggle}
      />
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

export default GalleryImage;
