import { Carousel } from '@mantine/carousel';
import { Image, useMantineTheme } from '@mantine/core';
import classes from './carousel.module.css';
import { useMediaQuery } from '@mantine/hooks';
interface Iprops {
  images: string[];
}

function ImageCarousel({ images }: Iprops) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = images.map((image: string, index: number) => (
    <Carousel.Slide key={index}>
      <Image src={image} className={classes.image} radius="md" />
    </Carousel.Slide>
  ));
  return (
    <Carousel
      withIndicators
      slideSize={{ base: '51%', sm: '51%' }}
      slideGap={{ base: 'md', sm: 'md' }}
      align="start"
      loop
      draggable
      slidesToScroll={mobile ? 1 : 2}
    >
      {slides}
    </Carousel>
  );
}

export default ImageCarousel;
