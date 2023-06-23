import Nav from "../components/LoginNav";
import { useRef, useState, useEffect } from "react";
import Product from "../components/Product";
import {
    atom,
    useRecoilCallback,
    useRecoilState,
    useRecoilValue,
} from "recoil";
import { productListAtom } from "../recoilAtom/ProductListAtom";
import { productDataAtom } from "../recoilAtom/ProductDataAtom";
import Footer from "../components/Footer";

export default function ProductRegis() {

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
            <Nav />
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
                        <Product
                            key={data.id}
                            id={data.id}
                            onDelete={deleteProduct}
                        ></Product>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}
