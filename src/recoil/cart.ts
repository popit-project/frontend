import { atom, selector } from "recoil";

export interface CartItem {
  id: number;
  itemNm: string;
  price: number;
  image: string;
  quantity: number;
}

export const cartListAtom = atom<CartItem[]>({
  key: "cartListAtom",
  default: [],
});

export const QuantityItem = selector({
  key: "QuantityItem",
  get: ({ get }) => {
    const cartItems = get(cartListAtom);
    const totalQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    return totalQuantity;
  },
});
