import { CartIcon } from "../../../assets/icons/Icons";
import { useRecoilState } from "recoil";
import { CartItem, cartListAtom } from "../../../recoil/cart";

const products = [
  { itemNm: "대형 피자 (1판)", price: 25000, id: 1, image: "" },
  { itemNm: "치즈버거", price: 11000, id: 2, image: "" },
  { itemNm: "짜장면", price: 8000, id: 3, image: "" },
  { itemNm: "연어초밥(10pc)", price: 18000, id: 4, image: "" },
  { itemNm: "아메리카노", price: 2500, id: 5, image: "" },
  { itemNm: "돈까스", price: 11000, id: 6, image: "" },
  { itemNm: "치킨샌드위치", price: 9000, id: 7, image: "" },
  { itemNm: "제육덮밥", price: 8500, id: 8, image: "" },
  { itemNm: "타코", price: 4300, id: 9, image: "" },
  { itemNm: "파스타", price: 14300, id: 10, image: "" },
];

export default function Product() {
  const [cartItems, setCartItems] = useRecoilState<CartItem[]>(cartListAtom);

  const addToCart = (id: number) => {
    const selectedItem = products.find((product) => product.id === id);
    if (selectedItem) {
      const newCartItem: CartItem = {
        ...selectedItem,
        quantity: 1,
      };
      const updatedCart = [...cartItems, newCartItem];
      setCartItems(updatedCart);
      console.log(updatedCart);
    }
  };

  return (
    <div className="m-10 bg-slate-100 rounded-lg text-left p-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        {products.map((product, index) => (
          <div
            key={index}
            className="border border-gray-400 rounded-xl bg-white"
          >
            <div className="m-4 divide-y divide-slate-300">
              <img src="" alt="" className="h-40 mx-auto mb-4" />
              <div className="flex justify-between items-center">
                <div className="w-3/4 mt-2">
                  <p className="line-clamp-1 font-semibold">{product.itemNm}</p>
                  <p className="text-slate-500">{product.price}원</p>
                </div>
                <button
                  className="btn btn-ghost btn-circle cursor-pointer focus:outline-none"
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
