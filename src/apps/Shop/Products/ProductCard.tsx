import { Image, Card, Grid } from '@mantine/core';
import { ProductWithShop } from '../../../@types/shop';
import classes from './ProductCard.module.css';
interface Iprops {
  product: ProductWithShop;
  setViewing: (item: ProductWithShop) => void;
  open: () => void;
}

function ProductCard({ product, open, setViewing }: Iprops) {
  return (
    <Grid.Col span={{ base: 6, md: 6, lg: 3 }} p={'sm'}>
      <Card
        className={classes.card}
        onClick={() => {
          setViewing(product);
          open();
        }}
      >
        <Card.Section h={150}>
          <Image src={product.images[0]} h={'100%'} />
        </Card.Section>
        <Card.Section p={'md'}>
          <p>{product.name}</p>
        </Card.Section>
        <Card.Section px={'md'}>
          <p>
            <span className="hidden sm:inline">Price:</span> ${product.price}
          </p>
        </Card.Section>
      </Card>
    </Grid.Col>
  );
}

export default ProductCard;
