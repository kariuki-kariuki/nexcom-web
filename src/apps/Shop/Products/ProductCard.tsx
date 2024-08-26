import { Image, Card, Grid, Group, Text, Button, rem } from '@mantine/core';
import { ProductWithShop } from '../../../@types/shop';
import classes from './ProductCard.module.css';
import { IconStar } from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';
interface Iprops {
  product: ProductWithShop;
  setViewing: (item: ProductWithShop) => void;
  open: () => void;
}

function ProductCard({ product, open, setViewing }: Iprops) {
  const slides = product.images.map((image) => (
    <Carousel.Slide key={image} classNames={{ slide: classes.slides }}>
      <Image src={image} height={'100%'} />
    </Carousel.Slide>
  ));
  return (
    <Grid.Col span={{ base: 12, sm: 6, lg: 4 }} p={'sm'}>
      <Card className={classes.card}>
        <Card.Section>
          <Carousel
            withIndicators
            loop
            classNames={{
              root: classes.carousel,
              controls: classes.carouselControls,
              indicator: classes.carouselIndicator,
            }}
            slideGap={'md'}
            slidesToScroll={1}
          >
            {slides}
          </Carousel>
        </Card.Section>
        <Group justify="space-between" mt="lg">
          <Text fw={500} fz="lg" lineClamp={1} w={'70%'}>
            {product.name}
          </Text>

          <Group gap={5}>
            <IconStar style={{ width: rem(16), height: rem(16) }} />
            <Text fz="xs" fw={500}>
              4.78
            </Text>
          </Group>
        </Group>

        <Text fz="sm" c="dimmed" mt="sm" lineClamp={4}>
          {product.description}
        </Text>

        <Group justify="space-between" mt="md">
          <div>
            <Text fz="lg" span fw={500} className={classes.price}>
              Ksh{' '}
              {product.price > 1000
                ? `${(product.price / 1000).toFixed(0)}k`
                : product.price}
            </Text>
            <Text span fz="sm" c="dimmed"></Text>
          </div>

          <Button
            radius="md"
            bg={'teal'}
            onClick={() => {
              setViewing(product), open();
            }}
          >
            Add to Cart
          </Button>
        </Group>
      </Card>
    </Grid.Col>
  );
}

export default ProductCard;
