import { Image, Card, Grid, Group, Text, Button, rem } from '@mantine/core';
import { ProductWithShop } from '../../../@types/shop';
import classes from './ProductCard.module.css';
import { IconShoppingCartFilled, IconStar } from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';
interface Iprops {
  product: ProductWithShop;
  setViewing: (item: ProductWithShop) => void;
  open: () => void;
}

function ProductCard({ product, open, setViewing }: Iprops) {
  const slides = product.images.map((image) => (
    <Carousel.Slide key={image} h={300}>
      <Image src={image} height={'100%'} />
    </Carousel.Slide>
  ));
  return (
    <Grid.Col span={{ base: 12, md: 6, lg: 4 }} p={'sm'}>
      <Card
        className={classes.card}
        
      >
        <Card.Section>
          <Carousel
            withIndicators
            loop
            classNames={{
              root: classes.carousel,
              controls: classes.carouselControls,
              indicator: classes.carouselIndicator,
            }}
          >
            {slides}
          </Carousel>
        </Card.Section>
        <Group justify="space-between" mt="lg">
          <Text fw={500} fz="lg" lineClamp={1} w={"70%"}>
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
            <Text fz="xl" span fw={500} className={classes.price}>
              Ksh{' '}
              {product.price > 1000 ? `${product.price / 1000}k` : product.price}
              
            </Text>
            <Text span fz="sm" c="dimmed"></Text>
          </div>

          <Button radius="md" bg={"purple"} onClick={() => {setViewing(product), open()}}>Add to Cart</Button>
        </Group>
      </Card>
    </Grid.Col>
  );
}

export default ProductCard;
