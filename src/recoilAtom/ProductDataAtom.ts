import { atom } from "recoil";



export const productDataAtom = atom<FormData>({
    key: "productdata",
    default: new FormData(),
})

// interface ProductData{
//     // image: string | null;
    
//     name: string;
//     price: string;
//     quantity: string;
// }