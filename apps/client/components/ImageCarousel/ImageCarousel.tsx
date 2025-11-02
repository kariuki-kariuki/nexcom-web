import { Carousel, CarouselSlide } from '@mantine/carousel';
import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Product, ImageInterface } from '../../lib/@types/shop';
import CarouselImage from './CarouselImage';
import classes from './ImageCarousel.module.css';

interface Props {
  images: ImageInterface[];
  toggle: () => void;
  setProduct: (updater: (product: Product) => Product) => void;
}
export function ProductCorousel({ images, setProduct }: Props) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-witdh: ${theme.breakpoints.sm})`);
  const slides = images.map((image) => (
    <CarouselSlide key={image.id}>
      <CarouselImage image={image} setProduct={setProduct} />
    </CarouselSlide>
  ));
  return (
    <Carousel
      withIndicators
      height={mobile ? '100%' : '100%'}
      slideSize={{ base: '100%', sm: '100%', md: '100%' }}
      slideGap={{ base: 0, sm: 'md' }}
      slidesToScroll={1}
      classNames={{control: classes.controls}}
      // orientation={mobile ? 'horizontal' : 'vertical'}
    >
      {slides}
    </Carousel>
  );
}
