import React from 'react';
import { IconX } from '@tabler/icons-react';
import { Button, Image, Paper, rem } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import classes from './Previews.module.css';

interface Props {
  files: FileWithPath[];
  setFiles: (files: FileWithPath[]) => void;
}
function MessageImagePreviews({ files, setFiles }: Props) {
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <CarouselSlide key={index}>
        <div className={classes.box}>
          <Paper className={classes.flex}>
            <Image
              key={index}
              src={imageUrl}
              w="100%"
              mah='300'
            // onLoad={() => URL.revokeObjectURL(imageUrl)}
            />
          </Paper>
          <Button
            color="red.9"
            w="100%"
            className={classes.btn}
            onClick={() => setFiles(files.filter((item) => item !== file))}
          >
            <IconX color="white" size={20} />{' '}
          </Button>
        </div>
      </CarouselSlide>
    );
  });
  return (
    <Paper mx="md" radius='lg' className={classes.paper}>
      <Carousel
        slideSize={{ base: '33%', sm: '33%' }}
        slideGap={{ base: rem(5), sm: 'sm' }}
        emblaOptions={{ loop: true, slidesToScroll: 1, align: 'start' }}
      >
        {previews}
      </Carousel>
    </Paper>
  );
}

export default MessageImagePreviews;
