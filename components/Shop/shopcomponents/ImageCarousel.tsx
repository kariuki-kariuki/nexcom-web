import { Carousel } from '@mantine/carousel';
import { Image, useMantineTheme } from '@mantine/core';
import classes from './carousel.module.css';
import { useMediaQuery } from '@mantine/hooks';
import { ProductImage } from '@/lib/@types/shop';
interface Iprops {
  images: ProductImage[];
}

function ImageCarousel({ images }: Iprops) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = images.map((image, index: number) => (
    <Carousel.Slide key={index} className={classes.slide}>
      <Image src={image.url} className={classes.image} radius="sm" />
    </Carousel.Slide>
  ));
  return (
    <Carousel
      withIndicators
      slideGap={{ base: 'md', sm: 'md' }}
      align="start"
      loop
      draggable
      slidesToScroll={mobile ? 1 : 1}
    >
      {slides}
    </Carousel>
  );
}

export default ImageCarousel;
