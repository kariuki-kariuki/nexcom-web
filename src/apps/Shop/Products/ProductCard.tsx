import {
  Image,
  Card,
  Grid,
  Group,
  Text,
  Button,
  rem,
  useMantineTheme
} from '@mantine/core';
import { ProductWithShop } from '../../../@types/shop';
import classes from './ProductCard.module.css';
import { IconShoppingCartPlus, IconStar } from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
interface Iprops {
  product: ProductWithShop;
  setViewing: (item: ProductWithShop) => void;
  toggle: () => void;
}

function ProductCard({ product, toggle, setViewing }: Iprops) {
  const slides = product.images.map((image) => (
    <Carousel.Slide key={image} classNames={{ slide: classes.slides }}>
      <Image src={image} height={'100%'} />
    </Carousel.Slide>
  ));
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return (
    <Grid.Col span={{ base: 6, sm: 6, lg: 4 }} p={{ base: 'none', sm: 'sm' }}>
      <Card className={classes.card}>
        <Card.Section>
          <Carousel
            withIndicators
            loop
            classNames={{
              root: classes.carousel,
              controls: classes.carouselControls,
              indicator: classes.carouselIndicator
            }}
            slideGap={'md'}
            slidesToScroll={1}
          >
            {slides}
          </Carousel>
        </Card.Section>
        <Group justify="space-between" mt="lg" wrap="nowrap">
          <Text
            fw={{ base: 200, sm: 500 }}
            fz={{ base: 'xs', sm: 'lg' }}
            lineClamp={1}
            w={'70%'}
          >
            {product.name}
          </Text>

          <Group gap={mobile ? 3 : 'lg'} wrap="nowrap">
            <IconStar style={{ width: rem(16), height: rem(16) }} />
            <Text fz="xs" fw={500}>
              4.78
            </Text>
          </Group>
        </Group>

        <Text fz="sm" c="dimmed" mt="sm" lineClamp={mobile ? 1 : 4}>
          {product.description}
        </Text>

        <Group justify="space-between" mt="md" wrap="nowrap">
          <div>
            <Text
              fz={{ base: 'sm', sm: 'lg' }}
              span
              fw={500}
              className={classes.price}
            >
              Ksh{' '}
              {product.price > 1000
                ? `${(product.price / 1000).toFixed(0)}k`
                : product.price}
            </Text>
            <Text span fz="sm" c="dimmed"></Text>
          </div>

          <Button
            radius="md"
            color={'teal'}
            onClick={() => {
              setViewing(product), toggle();
            }}
            fz={{ base: 'xs', sm: 'auto' }}
            variant="outline"
            p={{ base: '10px', sm: 'sm' }}
          >
            {mobile ? <IconShoppingCartPlus size={14} /> : 'Add to Cart'}
          </Button>
        </Group>
      </Card>
    </Grid.Col>
  );
}

export default ProductCard;
