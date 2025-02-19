import React from 'react';
import { IconX } from '@tabler/icons-react';
import { Box, Button, Group, Image, rem, SimpleGrid } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { Carousel, CarouselSlide } from '@mantine/carousel';

interface Props {
  files: FileWithPath[];
  setFiles: (files: FileWithPath[]) => void;
}
function Previews({ files, setFiles }: Props) {
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <CarouselSlide key={index}>
        <Box h={300}>
          <Image
            key={index}
            src={imageUrl}
            w="auto"
            h='100%'
            onLoad={() => URL.revokeObjectURL(imageUrl)}
            radius="sm"
          />
        </Box>
        <Button
          color="red.9"
          radius="sm"
          w="100%"
          onClick={() => setFiles(files.filter((item) => item !== file))}
        >
          <IconX color="white" size={20} />{' '}
        </Button>
      </CarouselSlide>
    );
  });
  return (
    <Carousel slidesToScroll={1}
      slideSize={{ base: '30%', sm: '30%' }}
      slideGap={{ base: rem(2), sm: 'md' }}
      loop
    >
      {previews}
    </Carousel>
  );
}

export default Previews;
