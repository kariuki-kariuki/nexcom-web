import { Carousel } from '@mantine/carousel';
import { Avatar, Image, useMantineTheme } from '@mantine/core';
import classes from './carousel.module.css';
import { useMediaQuery } from '@mantine/hooks';
import { ImageInterface } from '@/lib/@types/shop';
interface Iprops {
  images: ImageInterface[];
}

function ImageCarousel({ images }: Iprops) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = images.map((image, index: number) => (
    <Carousel.Slide key={index} className={classes.slide}>
      <Avatar src={image.signedUrl} variant='transparent' className={classes.image} radius="sm" />
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
      classNames={{control: classes.control}}
    >
      {slides}
    </Carousel>
  );
}

export default ImageCarousel;
