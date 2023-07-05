import { useState, useEffect } from "react";
import ProductComp from "../components/ProductComp";

import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";

interface item{
    itemNm: string;
    price: number;
    stockNumber: number;
    itemImgURL: string;
    id: number;
}

export default function ProductRegisPage() {

    const [productList, setProductList] = useState([]);
    const [sellerOn, setSellerOn] = useState("");
    const [trigger, setTrigger] = useState(0);

    const newTrigger = (value : number) => {
        setTrigger((prev) => prev + value);
        console.log(trigger)
    }
    
        

    useEffect(() => {
        const userId = localStorage.getItem("sellerId");
        
        if (userId) {
            setSellerOn(userId);
        }

        const productSearch = async () => {
            const res = await axiosInstance.get(
                `http://3.34.149.107:8082/api/seller/item/${sellerOn}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            if (JSON.stringify(res.data) !== JSON.stringify(productList)) {
                setProductList(res.data);
            }           
            console.log(res.data)
            console.log(productList)           
            
        }
        productSearch();
        
    },[sellerOn,productList])

    return (
        <>
            <div className="w-full my-0 mx-auto mb-[3rem]">
                <div className="flex justify-center items-center mt-[3rem] w-full">
                    <div className="text-2xl">상품 등록</div>
                </div>
                <div className="border-b-4 border-stone-300">
                    <div className="w-full flex justify-center items-center mt-[3rem]">
                        <ProductComp
                            bt={0}
                            name="이름 입력"
                            price="가격 입력"
                            stock="재고수량 입력"
                            imageUrl=""
                            productId={0}
                            trigger={newTrigger}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full my-0 mx-auto mb-[3rem]">
                <div className="flex justify-center items-center mt-[3rem] w-full">
                    <div className="text-2xl">상품 수정</div>
                </div>
                <div className="border-b-4 border-stone-300">
                    <div className="mt-[3rem]">
                        {productList.map((data: item) => (
                            <div className="flex justify-center">
                                <ProductComp
                                    bt={1}
                                    name={data.itemNm}
                                    price={data.price}
                                    stock={data.stockNumber}
                                    imageUrl={data.itemImgURL}
                                    productId={data.id}
                                    trigger={newTrigger}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}


