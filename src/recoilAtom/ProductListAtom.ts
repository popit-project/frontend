import { atom } from "recoil";

export const productListAtom = atom<{id: number}[]>({
    key: "productList",
    default: [],
});