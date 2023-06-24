import { useRecoilState, useRecoilValue } from "recoil";
import { CartItem, cartListAtom } from "../../recoilAtom/cart";

export default function CartList({ data }: { data: CartItem }) {
  const cartList = useRecoilValue(cartListAtom);
  const [cartListState, setCartListState] = useRecoilState(cartListAtom);

  const addCount = (id: number) => {
    const updatedCartList = cartList.map((cartItem) => {
      if (cartItem.id === id) {
        const updatedQuantity = cartItem.quantity + 1;
        const updatedPrice =
          cartItem.price + cartItem.price / cartItem.quantity;
        return { ...cartItem, quantity: updatedQuantity, price: updatedPrice };
      }
      return cartItem;
    });
    setCartListState([...updatedCartList]);
  };

  const removeCount = (id: number) => {
    const updatedCartList = cartList.map((cartItem) => {
      if (cartItem.id === id) {
        const updatedQuantity =
          cartItem.quantity > 1 ? cartItem.quantity - 1 : 1;
        const updatedPrice =
          cartItem.price - cartItem.price / cartItem.quantity;
        return { ...cartItem, quantity: updatedQuantity, price: updatedPrice };
      }
      return cartItem;
    });
    setCartListState([...updatedCartList]);
  };

  const removeProduct = (id: number) => {
    const updatedCartList = cartList.filter((cartItem) => cartItem.id !== id);
    setCartListState(updatedCartList);
  };

  return (
    <div>
      <div className="flex flex-col my-4 sm:flex-row sm:items-center">
        <div className="flex order-last sm:order-none sm:items-center sm:grow">
          <figure className="w-20 flex-shrink-0 rounded-2xl overflow-hidden px-2 py-2 bg-white border mr-2">
            <img
              src={data.itemImgURL}
              alt=""
              className="object-contain w-full h-20"
            />
          </figure>
          <div className="flex flex-col sm:flex-row sm:items-center sm:grow">
            <p className="text-left line-clamp-1 min-w-0 font-semibold sm:grow sm:w-96">
              {data.itemNm}
            </p>
            <div className="join join-horizontal order-last flex-grow-0 sm:ml-10 sm:order-none ">
              <button
                onClick={() => {
                  addCount(data.id);
                }}
                className="btn join-item border-0 hover:bg-indigo-300 hover:text-white focus:outline-none"
              >
                +
              </button>
              <button className="btn join-item">{data.quantity}</button>
              <button
                className="btn join-item border-0 hover:bg-indigo-300 hover:text-white focus:outline-none"
                onClick={() => {
                  removeCount(data.id);
                }}
              >
                -
              </button>
            </div>
            <span className="flex-grow-0 w-20 text-gray-500 mb-4 text-left sm:ml-2 sm:mb-0 sm:text-center">
              {data.price}원
            </span>
          </div>
        </div>
        <button
          className="flex-grow-0 ml-auto mb-4 border-0 bg-transparent text-indigo-300 sm:ml-5 sm:mb-0"
          onClick={() => {
            removeProduct(data.id);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
}
