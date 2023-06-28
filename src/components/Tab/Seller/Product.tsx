import { CartIcon } from "../../../assets/icons/Icons";
import { useRecoilState } from "recoil";
import { CartItem, cartListAtom } from "../../../recoilAtom/cart";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../AxiosInstance/AxiosConfig";
import { Link } from "react-router-dom";

interface products {
  itemNm: string;
  price: number;
  id: number;
  stockNumber: string;
  itemImgURL: string;
  itemSellStatus: string;
}

export default function Product() {
  const [cartItems, setCartItems] = useRecoilState<CartItem[]>(cartListAtom);
  const [products, setProducts] = useState<products[]>([]);
  // const userId = localStorage.getItem("userId");

  useEffect(() => {
    axiosInstance
      .get("http://3.34.149.107:8082/api/seller/item/test1")
      .then((response) => {
        const data = response.data;
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="my-10 bg-indigo-50 rounded-lg text-left p-5">
        <Link to={"/productRegis"} className="flex items-center justify-end">
          <span className="mb-5 btn btn-outline w-full mt-2 focus:outline-none sm:w-auto sm:mt-0 border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400">
            상품 등록/수정
            {/* <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.75 8.75H7.5C6.83696 8.75 6.20107 9.01339 5.73223 9.48223C5.26339 9.95107 5 10.587 5 11.25V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H18.75C19.413 25 20.0489 24.7366 20.5178 24.2678C20.9866 23.7989 21.25 23.163 21.25 22.5V21.25"
                stroke="black"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 6.25013L23.75 10.0001M25.4813 8.23138C25.9736 7.73908 26.2501 7.07136 26.2501 6.37513C26.2501 5.6789 25.9736 5.01119 25.4813 4.51888C24.9889 4.02658 24.3212 3.75 23.625 3.75C22.9288 3.75 22.2611 4.02658 21.7688 4.51888L11.25 15.0001V18.7501H15L25.4813 8.23138Z"
                stroke="black"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg> */}
          </span>
        </Link>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          {products.map((product, index) => (
            <div
              key={index}
              className="border border-indigo-200 rounded-xl bg-white"
            >
              <div className="m-4">
                <img
                  src={product.itemImgURL}
                  alt=""
                  className="h-40 mx-auto mb-4"
                />
                <div className="flex justify-between items-center border-t border-indigo-100">
                  <div className="w-8/12 mt-2">
                    <p className="line-clamp-1 font-semibold text-slate-500">
                      {product.itemNm}
                    </p>
                  </div>
                  <p className="text-slate-500">{product.price}원</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-8/12 mt-2">
                    <p className="line-clamp-1 font-semibold">재고현황</p>
                  </div>
                  {product.itemSellStatus === "SOLD_OUT" ? (
                    <span className="text-rose-600 bg-rose-100 px-2 rounded-xl font-semibold">
                      품절
                    </span>
                  ) : (
                    <p className="font-semibold">{product.stockNumber} 개</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
