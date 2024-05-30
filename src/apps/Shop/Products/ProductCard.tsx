import { Card, Group, Image, Text } from "@mantine/core";
import { IProduct } from "../../../@types/shop";
import { IconBasketPlus, IconHeartPlus } from "@tabler/icons-react";
interface Iprops {
  product: IProduct;
  setViewing: (item: IProduct) => void;
  open: () => void;
}

function ProductCard({ product, open, setViewing }: Iprops) {
  return (
    <div className="rounded-lg outline-2 outline outline-slate-800	overflow-hidden bg-gray-900 my-3 font-serif">
      <Image src={product.image} />
      <div className="flex align-center justify-between px-2 py-3 border-b border-slate-800  ">
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
    </div>
  );
}

export default ProductCard;
