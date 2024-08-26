import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import classes from './carousel.module.css';
interface Iprops {
  images: string[];
}

function ImageCarousel({ images }: Iprops) {
  const slides = images.map((image: string, index: number) => (
    <Carousel.Slide key={index}>
      <Image src={image} h={'100%'} w={'100%'} radius="md" />
    </Carousel.Slide>
  ));
  return (
    <Carousel classNames={classes} withIndicators loop>
      {slides}
    </Carousel>
  );
}

export default ImageCarousel;
