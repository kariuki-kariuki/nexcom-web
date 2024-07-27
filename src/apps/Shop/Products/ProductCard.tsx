import { Image, Card, Grid } from '@mantine/core';
import { IProduct } from '../../../@types/shop';
import { IconBasketPlus, IconHeartPlus } from '@tabler/icons-react';
interface Iprops {
  product: IProduct;
  setViewing: (item: IProduct) => void;
  open: () => void;
}

function ProductCard({ product, open, setViewing }: Iprops) {
  return (
    <Grid.Col span={{ base: 6, md: 6, lg: 2 }}>
      <Card p={0}>
        <Image src={product.image} />
        <div className="flex align-center justify-between px-2 py-3">
          <p>{product.name}</p>
          <IconHeartPlus size={14} color="red" />
        </div>
        <div className="flex align-center justify-between px-2 py-3">
          <p>
            <span className="hidden sm:inline">Price:</span> ${product.price}
          </p>

          <IconBasketPlus
            size={20}
            color="blue"
            onClick={() => {
              open();
              setViewing(product);
            }}
          />
        </div>
      </Card>
    </Grid.Col>
  );
}

export default ProductCard;
