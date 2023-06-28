import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface CartItem {
  id: number;
  itemNm: string;
  price: number;
  itemImgURL: string;
  quantity: number;
}

export const cartListAtom = atom<CartItem[]>({
  key: "cartListAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
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

export const TotalPrice = selector({
  key: "TotalPrice",
  get: ({ get }) => {
    const cartItems = get(cartListAtom);
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    return totalPrice;
  },
});
