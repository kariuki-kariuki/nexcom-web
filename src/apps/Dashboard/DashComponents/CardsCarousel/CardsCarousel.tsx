import { Carousel } from '@mantine/carousel';
import { rem, Card, Text, Button, useMantineTheme, Group } from '@mantine/core';
import { ShopProduct } from '../../../../@types/shop';
import { CarouselCard } from '../CarouselCard/CarouselCard';
import classes from './CardsCarousel.module.css';
import { useFetch } from '../../../../hooks/useFetchHooks';
import { GlobalUser } from '../../../../@types/chat';
import { IconCirclePlusFilled } from '@tabler/icons-react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import NewProduct from '../../../Admin/products/NewProduct/NewProduct';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../context/appContext';
import { UserContextType } from '../../../../@types/app';
export interface IProps {
  products: ShopProduct[];
}
export function CardsCarousel({ userClicked }: { userClicked: GlobalUser }) {
  const { user } = useContext(AppContext) as UserContextType;
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const { result } = useFetch<ShopProduct[]>(`shops/${userClicked.shop?.id}`);
  const [opened, { toggle }] = useDisclosure();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  useEffect(() => {
    if (result) {
      return setProducts(result);
    }
  }, [result]);

  const slides = products?.map((item) => (
    <Carousel.Slide key={item.id}>
      {userClicked.shop ? (
        <CarouselCard product={item} shopId={userClicked.shop?.id} />
      ) : (
        ''
      )}
    </Carousel.Slide>
  ));
  return (
    <Card className={classes.card}>
      {user?.id === userClicked.id ? (
        <Group justify="center">
          <Button
            radius="md"
            variant="default"
            leftSection={<IconCirclePlusFilled size={18} color="white" />}
            onClick={toggle}
            bg="teal"
          >
            New Product
          </Button>
        </Group>
      ) : (
        ''
      )}
      {products?.[0] ? (
        <Card px={0} shadow="xl" className={classes.card}>
          <Text ta={'center'} fw={500} fz={'xl'}>
            Browse
          </Text>

          <Carousel
            slideSize={{ base: '50%', sm: '50%' }}
            slideGap={{ base: rem(2), sm: 'md' }}
            align="start"
            loop
            slidesToScroll={mobile ? 1 : 1}
          >
            {slides}
          </Carousel>
        </Card>
      ) : (
        ''
      )}
      <NewProduct opened={opened} toggle={toggle} setProducts={setProducts} />
    </Card>
  );
}
