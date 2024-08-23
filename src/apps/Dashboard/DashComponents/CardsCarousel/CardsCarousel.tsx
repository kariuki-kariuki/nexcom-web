import { Carousel } from '@mantine/carousel';
import { rem, Card, Text } from '@mantine/core';
import { ShopProduct } from '../../../../@types/shop';
import { CarouselCard } from '../CarouselCard/CarouselCard';

export interface IProps {
  products: ShopProduct[];
}
export function CardsCarousel({ products }: IProps) {
  const slides = products?.map((item) => (
    <Carousel.Slide key={item.id}>
      <CarouselCard product={item} />
    </Carousel.Slide>
  ));

  return (
    <Card>
      <Text ta={'center'} fw={500} fz={'lg'}>
        Browse
      </Text>
      <Carousel
        slideSize={{ base: '100%', sm: '50%' }}
        slideGap={{ base: rem(2), sm: 'md' }}
        align="start"
        loop
      >
        {slides}
      </Carousel>
    </Card>
  );
}
