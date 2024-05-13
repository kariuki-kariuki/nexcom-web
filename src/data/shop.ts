import { faker } from "@faker-js/faker";
import { IProduct } from "../@types/shop";

function createProduct(): IProduct {
    return {
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        image: faker.image.food(600, 600, true),
    }

}
// const products: IProduct[] = [

// ]

export const GetProducts = (): IProduct[] => {
    let products: IProduct[] = [];

    for(let i = 0; i < 10; i++) {
        products.push(createProduct())
    }

    return products;
}   