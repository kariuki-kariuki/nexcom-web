import React from 'react';
import { IconX } from '@tabler/icons-react';
import { Button, Image, rem, Paper } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import classes from './Previews.module.css';

interface Props {
  files: FileWithPath[];
  setFiles: (files: FileWithPath[]) => void;
}
function Previews({ files, setFiles }: Props) {
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <CarouselSlide key={index}>
        <div className={classes.box}>
          <Paper h={300}>
            <Image
              key={index}
              src={imageUrl}
              w="auto"
              h='100%'
              onLoad={() => URL.revokeObjectURL(imageUrl)}
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
    <>
      {files.length > 0 &&
        <Carousel slidesToScroll={1}
          slideSize={{ base: '33%', sm: '50%' }}
          slideGap={{ base: rem(5), sm: 'lg' }}
          loop
        >
          {previews}
        </Carousel>
      }
    </>
  );
}

export default Previews;
