import { useEffect, useState } from "react";
import { axiosInstance } from "../../AxiosInstance/AxiosConfig";
import { Link } from "react-router-dom";

interface ProductProps {
  storeId: number;
}

interface products {
  itemNm: string;
  price: number;
  id: number;
  stockNumber: string;
  itemImgURL: string;
  itemSellStatus: string;
}

//api변수 sellerId
export default function Product({ storeId }: ProductProps) {
  const [products, setProducts] = useState<products[]>([]);

  useEffect(() => {
    axiosInstance
      .get(`https://pop-it.store/api/seller/item/${storeId}`)
      .then((response) => {
        console.log("완성");
        const data = response.data;
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [storeId]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="my-10 bg-indigo-50 rounded-lg text-left p-5 m-5">
        {products.length === 0 ? (
          <div className="text-center text-xl font-semibold leading-8">
            <p className="mb-5">아직 등록된 상품이 없어요! 🥲</p>
            <Link
              to={"/productRegisPage"}
              className="flex items-center justify-center"
            >
              <span className="btn btn-outline w-full mt-2 focus:outline-none sm:w-auto sm:mt-0 border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400">
                상품 등록/수정
              </span>
            </Link>
          </div>
        ) : (
          <>
            <Link
              to={"/productRegisPage"}
              className="flex items-center justify-end"
            >
              <span className="mb-5 btn btn-outline w-full mt-2 focus:outline-none sm:w-auto sm:mt-0 border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400">
                상품 등록/수정
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
                        <p className="font-semibold">
                          {product.stockNumber} 개
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
