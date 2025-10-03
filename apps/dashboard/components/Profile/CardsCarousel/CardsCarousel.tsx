import { Carousel } from '@mantine/carousel';
import { rem, Card, Text, Button, useMantineTheme, Group } from '@mantine/core';
import { ShopProduct, ShopWithProducts } from '@repo/nexcom-types';
import { CarouselCard } from '../CarouselCard/CarouselCard';
import classes from './CardsCarousel.module.css';
import { IconCirclePlusFilled } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { GlobalUser } from '@repo/nexcom-types';
import { notifications } from '@mantine/notifications';
import Link from 'next/link';
import { datasource, useGlobalStore } from '@repo/shared-logic';
export interface IProps {
  products: ShopProduct[];
}
export function CardsCarousel({ userClicked }: { userClicked: GlobalUser }) {
  const user = useGlobalStore((state) => state.user);
  const [shop, setShop] = useState<ShopWithProducts | null>(null);
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  useEffect(() => {
    const getShop = async () => {
      const { data, error } = await datasource.get<ShopWithProducts>(`shops/${userClicked.shop?.id}`);
      if(error){
        notifications.show({
          title: 'Error',
          color: 'red.7',
          message: error,
        })
      }
      if(data){
        setShop(data)
      }
    }
    getShop()
   
  }, []);

  const slides = shop?.products?.map((item) => (
    <Carousel.Slide key={item.id}>
      {userClicked.shop ? (
        <CarouselCard product={item} user={userClicked} shop={shop}/>
      ) : (
        ''
      )}
    </Carousel.Slide>
  ));
  return (
    <Card className={classes.card} bg="none">
      {user?.id === userClicked.id ? (
        <Group justify="center">
          <Link href='/dashboard/products/create'>

          <Button
            radius="md"
            variant="default"
            leftSection={<IconCirclePlusFilled size={18} color="white" />}
            bg="coco.4"
            c='white'
          >
            New Product
          </Button>
          </Link>
        </Group>
      ) : (
        ''
      )}
      {shop?.products?.[0] ? (
        <Card px={0} shadow="xl" bg="none" className={classes.card}>
          <Text ta={'center'} fw={500} fz={'xl'}>
            Browse
          </Text>

          <Carousel
            slideSize={{ base: '50%', sm: '50%' }}
            slideGap={{ base: rem(2), sm: 'md' }}
            align="start"
            loop
            slidesToScroll={mobile ? 1 : 1}
            classNames={{control: classes.control}}
          >
            {slides}
          </Carousel>
        </Card>
      ) : (
        ''
      )}
    </Card>
  );
}
