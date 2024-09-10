import { Carousel } from '@mantine/carousel';
import bg1 from '../assets/bg1.png';
import bg2 from '../assets/bg-2.png';
import bg3 from '../assets/bg-3.png';
import classes from './HeroCorousel.module.css';
const HeroCarousel = () => {
  const images = [bg1, bg2, bg3];
  const slides = images.map((image) => (
    <Carousel.Slide h={'100%'}>
      <img src={image} style={{ height: 'auto', width: '100%' }} />
    </Carousel.Slide>
  ));
  return (
    <Carousel
      loop
      h={'100%'}
      slideGap={'md'}
      withIndicators
      classNames={classes}
    >
      {slides}
    </Carousel>
  );
};

export default HeroCarousel;
