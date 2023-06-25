import { useRecoilState, useRecoilValue } from "recoil";
import { cartListAtom, TotalPrice } from "../recoilAtom/cart";
import { Link } from "react-router-dom";
import { useState } from "react";
import PaymentModal from "../components/Cart/PaymentModal";
import CartList from "../components/Cart/CartList";

export default function CartPage() {
  const cartList = useRecoilValue(cartListAtom);
  const totalPrice = useRecoilValue(TotalPrice);
  const [cartListState, setCartListState] = useRecoilState(cartListAtom);
  const [showModal, setShowModal] = useState(false);

  const handlerPayment = () => {
    setShowModal(true);
  };

  const handleConfirmPayment = () => {
    console.log("Payment confirmed");
    setShowModal(false);
  };

  const handleCancelPayment = () => {
    setShowModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold text-center mb-10">장바구니</h3>
      {cartListState.length === 0 ? (
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
            <CartList key={item.id} data={item} />
          ))}
          <div className="border-t-2 flex items-center justify-between p-3 rounded-md mt-14">
            <p className="text-base">결제금액</p>
            <p className="text-2xl">{totalPrice} 원</p>
          </div>
          <button
            className="flex ml-auto text-xl py-2.5 px-7 text-white font-semibold rounded-xl bg-indigo-400 mt-3"
            onClick={handlerPayment}
          >
            결제하기
          </button>
          {showModal && (
            <PaymentModal
              onConfirm={handleConfirmPayment}
              onCancel={handleCancelPayment}
            />
          )}
        </>
      )}
    </div>
  );
}
