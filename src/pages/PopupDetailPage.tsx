import { Product, productList } from "../../productList.ts";
import { useEffect, useState } from "react";
import { CartIcon } from "../assets/icons/Icons.tsx";

export default function PopupDetail() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productList()
      .then((data) => setProducts(data))
      .catch((error) => console.log(`Error: ${error}`));
  }, []);

  return (
    <>
      <div className="flex flex-col mb-10 justify-center text-center lg:flex-row md:flex-row md:text-left sm:flex-col sm: items-center sm:text-center">
        <figure className="bg-gray-500 mb-2 w-96 h-60 sm:mb-2">
          <img src="" alt="" />
          <span className="text-neutral-50 flex justify-center">
            이미지없음
          </span>
        </figure>
        <div className="ml-5">
          <h3 className="font-bold mb-2">팝업스토어 1</h3>
          <p>운영시간 : 10:00 ~ 20:00</p>
          <p>진행기간 : 2023.06.01 ~ 2023.06.31</p>
          <p>더 현대 지하 1층</p>
        </div>
      </div>
      <h4 className="text-center font-extrabold text-2xl mb-10">판매상품</h4>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        {products.map((product: Product) => (
          <div key={product.id} className="border border-gray-400 rounded-xl">
            <div className="m-4 divide-y divide-slate-300">
              <img src={product.image} alt="" className="h-40 mx-auto mb-4" />
              <div className="flex justify-between items-center">
                <div className="w-3/4 mt-2 text-left">
                  <p className="line-clamp-1 font-semibold">{product.itemNm}</p>
                  <p>{product.price}원</p>
                </div>
                <button className="btn btn-ghost btn-circle">
                  <CartIcon width={30} height={30} fill="black" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
