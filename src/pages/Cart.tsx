import { useRecoilState, useRecoilValue } from "recoil";
import { cartListAtom, TotalPrice } from "../recoil/cart";
import { Link } from "react-router-dom";

export default function Cart() {
  const cartList = useRecoilValue(cartListAtom);
  const totalPrice = useRecoilValue(TotalPrice);
  const [cartListState, setCartListState] = useRecoilState(cartListAtom);

  const addCount = (id: number) => {
    const updatedCartList = cartList.map((cartItem) => {
      if (cartItem.id === id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
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
        return { ...cartItem, quantity: updatedQuantity };
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
    <div className="max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold text-center mb-10">장바구니</h3>
      {cartList.length === 0 ? (
        <div className="bg-indigo-100 p-5 rounded-md mt-14 flex direction flex-col items-center">
          <p className="mb-5 font-semibold text-2xl">장바구니가 비었어요!</p>
          <Link to="/popuplist">
            <button className="btn btn-outline border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400 focus:outline-none">
              가게 둘러보기
            </button>
          </Link>
        </div>
      ) : (
        <>
          {cartList.map((item) => (
            <div
              className="flex flex-col my-4 sm:flex-row sm:items-center"
              key={item.id}
            >
              <div className="flex order-last sm:order-none sm:items-center sm:grow">
                <figure className="w-20 flex-shrink-0 rounded-2xl overflow-hidden px-2 py-2 bg-white border mr-2">
                  <img
                    src={item.image}
                    alt=""
                    className="object-contain w-full h-20"
                  />
                </figure>
                <div className="flex flex-col sm:flex-row sm:items-center sm:grow">
                  <p className="text-left line-clamp-1 min-w-0 font-semibold sm:grow sm:w-96">
                    {item.itemNm}
                  </p>
                  <div className="join join-horizontal order-last flex-grow-0 sm:ml-10 sm:order-none ">
                    <button
                      onClick={() => {
                        addCount(item.id);
                      }}
                      className="btn join-item border-0 hover:bg-indigo-400 hover:text-white focus:outline-none"
                    >
                      +
                    </button>
                    <button className="btn join-item">{item.quantity}</button>
                    <button
                      className="btn join-item border-0 hover:bg-indigo-400 hover:text-white focus:outline-none"
                      onClick={() => {
                        removeCount(item.id);
                      }}
                    >
                      -
                    </button>
                  </div>
                  <span className="flex-grow-0 w-20 text-gray-500 mb-4 text-left sm:ml-2 sm:mb-0 sm:text-center">
                    {item.price}원
                  </span>
                </div>
              </div>
              <button
                className="flex-grow-0 ml-auto mb-4 border-0 bg-transparent text-indigo-300 sm:ml-5 sm:mb-0"
                onClick={() => {
                  removeProduct(item.id);
                }}
              >
                X
              </button>
            </div>
          ))}
          <div className="border-t-2 flex items-center justify-between p-3 rounded-md mt-14">
            <p className="text-base">결제금액</p>
            <p className="text-2xl">{totalPrice} 원</p>
          </div>
          <button className="flex ml-auto text-xl py-2.5 px-7 text-white font-semibold rounded-xl bg-indigo-400 mt-3">
            결제하기
          </button>
        </>
      )}
    </div>
  );
}
