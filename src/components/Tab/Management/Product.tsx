import React from "react";
import { CartIcon } from "../../../assets/icons/Icons";

const products = [
  { name: "돈까스", price: "11000 원" },
  { name: "돈까스", price: "11000 원" },
  { name: "돈까스", price: "11000 원" },
  { name: "돈까스", price: "11000 원" },
  { name: "돈까스", price: "11000 원" },
  { name: "돈까스", price: "11000 원" },
  { name: "돈까스", price: "11000 원" },
  { name: "돈까스", price: "11000 원" },
  { name: "돈까스", price: "11000 원" },
  { name: "돈까스", price: "11000 원" },
];

export default function Product() {
  return (
    <div className="m-10 bg-slate-100 rounded-lg text-left p-5">
      {/* <div className="text-center text-xl font-semibold leading-8">
        <div className="mb-5">
          <p>판매중인 상품이 없어요! 🥲 (판매자용)</p>
          <p>판매할 상품을 등록해 보시겠어요?</p>
        </div>
        <button className="btn btn-outline focus:outline-none">
          상품 등록하기
        </button>
      </div> */}
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
                  <p className="line-clamp-1 font-semibold">{product.name}</p>
                  <p className="text-slate-500">{product.price}</p>
                </div>
                <button className="btn btn-ghost btn-circle cursor-pointer focus:outline-none">
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
