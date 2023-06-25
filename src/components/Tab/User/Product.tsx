import { CartIcon } from "../../../assets/icons/Icons";
import { useRecoilState } from "recoil";
import { CartItem, cartListAtom } from "../../../recoilAtom/cart";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../AxiosInstance/AxiosConfig";

interface products {
  itemNm: string;
  price: number;
  id: number;
  itemImgURL: string;
}

export default function Product() {
  const [cartItems, setCartItems] = useRecoilState<CartItem[]>(cartListAtom);
  const [products, setProducts] = useState<products[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/productList")
      .then((response) => {
        const data = response.data;
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addToCart = (id: number) => {
    const selectedItem = products.find((product) => product.id === id);
    if (selectedItem) {
      const existingItem = cartItems.find((item) => item.id === id);
      if (existingItem) {
        const updatedCart = cartItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
              price: item.price + selectedItem.price,
            };
          }
          return item;
        });
        setCartItems(updatedCart);
      } else {
        const newCartItem: CartItem = {
          ...selectedItem,
          quantity: 1,
          price: selectedItem.price,
        };
        const updatedCart = [...cartItems, newCartItem];
        setCartItems(updatedCart);
      }
    }
  };

  return (
    <div className="m-10 bg-indigo-50 rounded-lg text-left p-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        {products.map((product, index) => (
          <div
            key={index}
            className="border border-indigo-200 rounded-xl bg-white"
          >
            <div className="m-4 divide-y divide-indigo-100">
              <img
                src={product.itemImgURL}
                alt=""
                className="h-40 mx-auto mb-4"
              />
              <div className="flex justify-between items-center">
                <div className="w-3/4 mt-2">
                  <p className="line-clamp-1 font-semibold">{product.itemNm}</p>
                  <p className="text-slate-500">{product.price}원</p>
                </div>
                <button
                  className="btn btn-ghost btn-circle cursor-pointer focus:outline-none hover:bg-indigo-100"
                  onClick={() => addToCart(product.id)}
                >
                  <CartIcon width={30} height={30} fill="black" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
