import { useRecoilState, useRecoilValue } from "recoil";
import { cartListAtom } from "../recoil/cart";
import { Link } from "react-router-dom";

export default function Cart() {
  const cartList = useRecoilValue(cartListAtom);

  const addProduct = (id: number) => {
    const product = cartList.find((item) => item.id === id);
    if (product) {
      const updateCount = product.quantity + 1;
      console.log(product, updateCount);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold text-center mb-10">장바구니</h3>
      {cartList.length === 0 ? (
        <div className="bg-slate-300 p-5 rounded-md mt-14">
          <p className="mb-5 font-semibold text-2xl">장바구니가 비었어요!</p>
          <Link to="/">
            <button className="btn btn-outline">가게 둘러보기</button>
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
                  <div className="join join-horizontal order-last flex-grow-0 sm:ml-10 sm:order-none">
                    <button
                      onClick={() => {
                        addProduct(item.id);
                      }}
                      className="btn join-item hover:bg-slate-600 hover:text-white"
                    >
                      +
                    </button>
                    <button className="btn join-item">{item.quantity}</button>
                    <button className="btn join-item hover:bg-slate-600 hover:text-white">
                      -
                    </button>
                  </div>
                  <span className="flex-grow-0 w-20 text-gray-500 mb-4 text-left sm:ml-2 sm:mb-0 sm:text-center">
                    {item.price}원
                  </span>
                </div>
              </div>
              <button className="flex-grow-0 ml-auto mb-4 text-gray-300 sm:ml-5 sm:mb-0">
                X
              </button>
            </div>
          ))}
          <div className="bg-slate-300 flex items-center justify-between p-3 rounded-md mt-14">
            <p className="text-base">결제금액</p>
            <p className="text-2xl">10000 원</p>
          </div>
        </>
      )}
    </div>
  );
}
