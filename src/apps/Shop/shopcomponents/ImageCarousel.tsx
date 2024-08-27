import { Carousel } from '@mantine/carousel';
import { Image, rem, useMantineTheme } from '@mantine/core';
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
      slideSize={{ base: '50%', sm: '50%' }}
      slideGap={{ base: rem(2), sm: 'md' }}
      align="start"
      loop
      slidesToScroll={mobile ? 1 : 1}
    >
      {slides}
    </Carousel>
  );
}

export default ImageCarousel;
