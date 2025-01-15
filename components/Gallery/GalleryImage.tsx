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
import { Delete, update } from '../../lib/hooks/useFetchHooks';

interface Iprops {
  image: ImageGallery;
  setGalleries: (updater: (gal: IGallery[]) => IGallery[]) => void;
}
function GalleryImage({ image, setGalleries }: Iprops) {
  const [opened, { toggle }] = useDisclosure();
  const [imageUpdate, setImageUpdate] = useState(image);
  const handleUpdate = async () => {
    const res = await update({
      resource: `gallery-images/${image.id}`,
      formData: { altText: imageUpdate.altText }
    });
    if (!res) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update',
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
      color: 'scode.8'
    });
  };

  const handleDelete = async () => {
    const res = await Delete(`gallery-images/${image.id}`);
    if (!res) {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete Image',
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
      color: 'scode.8'
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
