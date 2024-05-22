import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import classes from "./carousel.module.css"
interface Iprops {
  images: string[];
}

function ImageCarousel({ images }: Iprops) {
  const slides = images.map((image: string, index: number) => (
    <Carousel.Slide key={index}>
      <div className="flex items-center justify-center h-full ">
        <Image  src={image} h={"70%"} w={"100%"} radius="md" />
      </div>
    </Carousel.Slide>
  ));
  return (
    <Carousel classNames={classes} withIndicators>
      {slides}
    </Carousel>
  );
}

export default ImageCarousel;
