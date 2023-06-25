import MainNav from "../components/MainNav";
import { useRef, useState, useEffect } from "react";
import ProductComp from "../components/ProductComp";
import {
    atom,
    useRecoilCallback,
    useRecoilState,
    useRecoilValue,
} from "recoil";
import { productListAtom } from "../recoilAtom/ProductListAtom";
import { productDataAtom } from "../recoilAtom/ProductDataAtom";
import Footer from "../components/Footer";
import LoginNav from "../components/LoginNav";

export default function ProductRegisPage() {

    // 가게이름
    const [list, setList] = useRecoilState(productListAtom);
    const [productDataList, setProductDataList] =
        useRecoilState(productDataAtom);        
    
    const addProduct = () => {
        setList([...list, { id: list.length + 1 }]);
        console.log(list);
    };

    const deleteProduct = (id: number) => {
        setList((prevList) => {
            const updatedList = prevList.filter((item) => item.id !== id);             
            return updatedList;
        });     
        
    };

    useEffect(() => {
        console.log(list);
    },[list])

    return (
        <div>
            <LoginNav />
            <div className="flex justify-center items-center mt-[3rem] w-screen">
                <div className="text-2xl mr-[5rem]">상품 등록 및 리스트</div>
                <button
                    className="btn bg-violet-400 hover:bg-violet-300"
                    onClick={addProduct}
                >
                    항목 추가
                </button>
            </div>
            <div>
                {list.map((data) => (
                    <div className="w-screen flex justify-center items-center mt-[3rem]">
                        <ProductComp
                            key={data.id}
                            id={data.id}
                            onDelete={deleteProduct}
                        ></ProductComp>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}
