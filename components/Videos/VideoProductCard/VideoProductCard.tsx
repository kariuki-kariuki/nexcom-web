'use client';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import { Button, Card, CardSection, Image, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from "./VideoProductCard.module.css"
import React, { useRef } from 'react'
import { Product } from '@/lib/@types/shop';
import Autoplay from 'embla-carousel-autoplay';

interface IProps {
  product: Product;
}
const VideoProductCard = ({ product }: IProps) => {
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  const slides = product.images.map((image) => <CarouselSlide key={image.id}>
    <Image src={image.url} alt={image.altText} height={mobile ? '100px' : '400px'} width="auto" />
  </CarouselSlide>)
  return (
    <Card radius="lg">
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
        <Button fullWidth radius={0} size='lg' visibleFrom="sm" color="coco.5">View Product</Button>
      </CardSection>
    </Card>
  )
}

export default VideoProductCard