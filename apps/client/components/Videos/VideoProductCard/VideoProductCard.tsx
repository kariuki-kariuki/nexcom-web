'use client';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import { Avatar, Button, ButtonGroup, Card, CardSection, Group, Image, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from "./VideoProductCard.module.css"
import React, { useRef } from 'react'
import { Product } from '@/lib/@types/shop';
import Autoplay from 'embla-carousel-autoplay';
import ContactSeller from '@/components/ContactSeller/ContactSeller';
import Link from 'next/link';
import { useGlobalStore } from '@/lib/context/global-store.provider';

interface IProps {
  product: Product;
}
const VideoProductCard = ({ product }: IProps) => {
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const user = useGlobalStore(state => state.user)

  const slides = product.images.map((image) => <CarouselSlide key={image.id}>
    <Image src={image.signedUrl} alt={image.altText} height={mobile ? '100px' : '300px'} width="auto" />
  </CarouselSlide>)
  return (
    <div>
      <Card radius="none" visibleFrom='sm'>
        <CardSection>
          <Carousel
            align="center"
            withControls={false}
            loop
            slidesToScroll={mobile ? 1 : 1}
            classNames={{ control: classes.control }}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
          >
            {slides}
          </Carousel>
        </CardSection>
        <CardSection>
          <ButtonGroup>
            <Link href={`/business/product/${product.id}`}>
              <Button fullWidth radius={0} size='lg' visibleFrom="sm" color="coco.5">View Product</Button>
            </Link>

            {product.shop?.user?.id !== user?.id ? <ContactSeller product={product} /> : <Button size='lg' fullWidth>Edit</Button>}
          </ButtonGroup>
        </CardSection>
      </Card>
    </div>
  )
}

export default VideoProductCard