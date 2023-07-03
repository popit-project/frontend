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
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";

export default function ProductRegisPage() {

    // 가게이름
    const data = useRecoilValue(productDataAtom);
    const [list, setList] = useRecoilState(productListAtom);
    const [productDataList, setProductDataList] =
        useRecoilState(productDataAtom);   
    
    const [formData, setFormData] = useState<FormData>(new FormData());
    
    // const addProduct = () => {
    //     setList([...list, { id: list.length + 1 }]);
    //     console.log(list);
    // };

    // const deleteProduct = (id: number) => {
    //     setList((prevList) => {
    //         const updatedList = prevList.filter((item) => item.id !== id);             
    //         return updatedList;
    //     });     
        
    // };

    const onRegist = () => {
        console.log(formData);
        
        
    }

    useEffect(() => {
        console.log(list);
    },[list])

    return (
        <>
            <div className="my-0 mx-auto mb-[10rem]">
                <div className="flex justify-center items-center mt-[6rem] w-screen">
                    <div className="text-2xl mr-[2rem]">
                        상품 등록 페이지
                    </div>
                    <button
                        className="btn btn-outline border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400"
                        onClick={onRegist}
                    >
                        + 추가하기
                    </button>
                </div>
                <div>
                    <div className="w-screen flex justify-center items-center mt-[3rem]">
                        <ProductComp                            
                        ></ProductComp>
                    </div>
                </div>
            </div>
            {/* <div className="max-w-7xl my-0 mx-auto mb-[10rem] border-t-2">
                <div className="flex justify-center items-center mt-[3rem] w-screen">
                    <div className="text-2xl mr-[5rem]">
                        내 상품 리스트 및 수정하기
                    </div>
                    <button
                        className="btn bg-indigo-400 hover:bg-indigo-300"
                        onClick={addProduct}
                    >
                        수정하기
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
            </div> */}
        </>
    );
}
