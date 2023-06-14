
const productsURL = "./products.json";

export interface Product {
  id: number;
  itemNm: string;
  price: number;
  image: string;
}

export const productList = async () => {
  try {
    const response = await fetch(productsURL);
    return await response.json();
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
