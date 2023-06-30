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
  itemSellStatus: string;
}

export default function Product() {
  const [cartItems, setCartItems] = useRecoilState<CartItem[]>(cartListAtom);
  const [products, setProducts] = useState<products[]>([]);

  useEffect(() => {
    axiosInstance
      .get("http://3.34.149.107:8082/api/seller/item/5")
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
    <div className="max-w-7xl mx-auto">
      <div className="my-10 bg-indigo-50 rounded-lg text-left p-5 m-5">
        {products.length === 0 ? (
          <div className="text-center text-xl font-semibold leading-8">
            <p>아직 가게에 등록된 상품이 없어요! 🥲</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            {products.map((product, index) => (
              <div
                key={index}
                className="border border-indigo-200 rounded-xl bg-white relative"
              >
                <div className="m-4 divide-y divide-indigo-100">
                  <img
                    src={product.itemImgURL}
                    alt=""
                    className="h-40 mx-auto mb-4"
                  />
                  <div className="flex justify-between items-center">
                    <div className="w-3/4 mt-2">
                      <p className="line-clamp-1 font-semibold">
                        {product.itemNm}
                      </p>
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
                {product.itemSellStatus == "SOLD_OUT" && (
                  <div className="absolute font-semibold text-lg top-0 left-0 w-full h-full bg-gray-400 border-gray-400 text-white rounded-md flex items-center justify-center cursor-not-allowed bg-opacity-80">
                    SOLD OUT
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
