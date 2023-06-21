import { atom } from "recoil";

interface ProductData{
    // image: string | null;
    
    name: string;
    price: string;
    quantity: string;
}

export const productDataAtom = atom<ProductData[]>({
    key: "productdatalist",
    default:[],
})