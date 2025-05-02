'use client';

import React, { useState } from 'react';
import { IconImageInPicture } from '@tabler/icons-react';
import {
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  GridCol,
  Group,
  LoadingOverlay,
  SegmentedControl,
  Text
} from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IGallery, ImageGallery } from '../../lib/@types/gallery';
import { DropzoneButton } from '../DropzoneButton/DropzoneButton';
import { createImage } from '../EditProduct/create';
import Previews from '../Previews/Previews';
import GalleryImage from './GalleryImage';
import classes from './Gallery.module.css';

interface GalleryProp {
  galleriesdb: IGallery[] | null;
}
function Gallery({ galleriesdb }: GalleryProp) {
  if (!galleriesdb || galleriesdb.length < 1) {
    return (
      <>
        <Text>No Items Yet</Text>
      </>
    );
  }
  const [galleries, setGalleries] = useState(galleriesdb);
  const [active, setActive] = useState('All');
  const [opened, { toggle }] = useDisclosure();
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [loading, setLoading] = useState(false);
  const handleCreate = async () => {
    if (files.length === 0) {
      notifications.show({
        title: 'Error',
        message: 'No images',
        color: 'red.9'
      });
    }
    setLoading((prevState) => !prevState);
    const formData = new FormData();
    // Append each file to FormData
    formData.append('galleryId', galleryId.toString());
    files.forEach((file) => {
      formData.append('files', file);
    });
    const res = await createImage<ImageGallery[]>({
      resource: 'gallery-images',
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
      setGalleries((prevGalla) => {
        prevGalla.map((gallery) => {
          if (gallery.id === galleryId) {
            gallery.images = [...gallery.images, ...res];
            return gallery;
          }
          return gallery;
        });
        return prevGalla;
      });
      notifications.show({
        message: 'Succefully added Images',
        title: 'Success',
        color: 'teal.9'
      });
      toggle();
    }
  };

  const [galleryId, setGalleryId] = useState(galleries[0].id);

  return (
    <Box p="md">
      <LoadingOverlay visible={loading} />
      <Group justify="space-between">
        <SegmentedControl
          radius="xl"
          size="xs"
          data={['All', 'Enterprise', 'NGO']}
          classNames={classes}
          onChange={setActive}
        />
        <Dialog opened={opened}>
          <DropzoneButton setFiles={setFiles} />
          <Previews files={files} setFiles={setFiles} />
          {files.length > 0 && (
            <Button my="md" onClick={handleCreate}>
              Upload
            </Button>
          )}
        </Dialog>
      </Group>
      {galleries
        .filter((gallery) => {
          if (active === 'All') return true;
          return gallery.name === active;
        })
        .map((gallery, idx) => (
          <Box key={gallery.name} py="lg">
            <Group justify="space-between" align="center" pb="md">
              <Text ta="center" fw="bold">
                {gallery.name}
              </Text>
              <Button
                color={galleryId === gallery.id ? 'orange.7' : 'coco.0'}
                leftSection={<IconImageInPicture />}
                size="xs"
                onClick={() => {
                  toggle();
                  setGalleryId(gallery.id);
                }}
              >
                Add to {gallery.name}
              </Button>
            </Group>
            <Grid>
              {gallery.images.map((image) => (
                <GridCol span={{ base: 6, sm: 3 }} key={image.id}>
                  <GalleryImage image={image} setGalleries={setGalleries} />
                </GridCol>
              ))}
            </Grid>
            {idx === 0 && <Divider mt="lg" />}
          </Box>
        ))}
    </Box>
  );
}

export default Gallery;
