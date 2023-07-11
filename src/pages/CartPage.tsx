import { useRecoilState, useRecoilValue } from "recoil";
import { cartListAtom, TotalPrice } from "../recoilAtom/cart";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PaymentModal from "../components/Cart/PaymentModal";
import CartList from "../components/Cart/CartList";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";

export default function CartPage() {
  const cartList = useRecoilValue(cartListAtom);
  const totalPrice = useRecoilValue(TotalPrice);
  const [cartListState, setCartListState] = useRecoilState(cartListAtom);
  const [showModal, setShowModal] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [error, setError] = useState(null);

  const handlerPayment = () => {
    setShowModal(true);
  };

  const handleConfirmPayment = () => {
    const purchasedItems = cartListState.map((item) => ({
      itemNm: item.itemNm,
      price: item.price,
      quantity: item.quantity,
    }));

    const requestData = {
      orderItems: purchasedItems,
    };

    axiosInstance
      .post("https://pop-it.store/api/order", requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setShowModal(false);
          setCartListState([]);
        }
      })
      .catch((error) => {
        console.error("payment error:", error);
        if (error.response && error.response.status === 400) {
          setError(error.response.data);
          setShowErrorAlert(true);
          setShowModal(false);
        }
      });
  };

  const handleCancelPayment = () => {
    setShowModal(false);
  };

  useEffect(() => {
    let timeout: number;

    if (showErrorAlert) {
      timeout = window.setTimeout(() => {
        setShowErrorAlert(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [showErrorAlert]);

  return (
    <div className="max-w-7xl mx-auto minHeight">
      {cartListState.length === 0 ? (
        <div className="minHeight bg-indigo-100 flex items-center justify-center">
          <div className="bg-indigo-100 p-5 rounded-md flex direction flex-col items-center justify-center">
            <p className="h-full mb-5 font-semibold text-2xl">
              장바구니가 비었어요!
            </p>
            <Link to="/popuplist">
              <button className="btn btn-outline border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400 focus:outline-none">
                가게 둘러보기
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-14">
          {cartList.map((item) => (
            <CartList key={item.id} data={item} />
          ))}
          <div className="border-t-2 flex items-center justify-between p-3 rounded-md mt-14">
            <p className="text-base">결제금액</p>
            <p className="text-2xl">{totalPrice} 원</p>
          </div>
          <button
            className="flex text-xl py-2.5 px-7 text-white font-semibold rounded-xl bg-indigo-400 mt-3 ml-auto mr-3"
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
          {showErrorAlert && (
            <div className="bg-gray-200 bg-opacity-80 absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="alert alert-error w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-semibold">{error}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
