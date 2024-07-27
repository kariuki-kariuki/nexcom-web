import { faker } from '@faker-js/faker';
import { IProduct } from '../@types/shop';
import bf from '../assets/bf.jpg';
function createProduct(): IProduct {
  return {
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    image: bf,
  };
}
// const products: IProduct[] = [

// ]

export const GetProducts = (): IProduct[] => {
  const products: IProduct[] = [];

  for (let i = 0; i < 10; i++) {
    products.push(createProduct());
  }

  return products;
};
