import { useRef, useState,useEffect } from "react";
import {
    atom,
    useRecoilState,
    useSetRecoilState,
    useRecoilValue,
} from "recoil";
import { productListAtom } from "../recoilAtom/ProductListAtom";
import { productDataAtom } from "../recoilAtom/ProductDataAtom";

interface ProductProps {
    id: number;
    onDelete: (id: number) => void;
}

//오늘 여기서 데이터 쏠수 있게끔 정리해두고. 로그인 회원가입 다시 하기.

export default function Product({ id, onDelete }: ProductProps) {
    const selectFile = useRef<HTMLInputElement>(null);   
    const [list, setList] = useRecoilState(productListAtom);
    const [productDataList, setProductDataList] = useRecoilState(productDataAtom);
    const [image, setImage] = useState<string | null>(null);


    const handleFileClick = () => {
        if (selectFile.current !== null && selectFile.current !== undefined) {
            selectFile.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const uploadedImage = reader.result as string;
                setImage(uploadedImage);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setProductDataList((prevList) => {
            if (prevList.length === 0) {
                return [{ name, price: "", quantity: "", [name]: value }];
            } else {
                const updatedList = [...prevList];
                const index = id - 1;
                updatedList[index] = { ...updatedList[index], [name]: value };
                return updatedList;
            }
        });
    };

    const deleteProduct = () => {
        setProductDataList((prevList) => {
            const updatedList = prevList.filter((data, index) => index !== id - 1);            
            return updatedList;
        })
        onDelete(id);
       
    };

    useEffect(() => {
        console.log(productDataList);
    }, [productDataList]);

    return (
        <div className="flex border-4 border-green-400 p-2 rounded-md mb-[2rem]">
            <div className="mr-[2rem]">
                <div className="border-2 border-green-400 rounded-lg h-[11rem] w-[11rem] flex justify-center items-center">
                    {image ? (
                        <img
                            className="h-[10rem] w-[10rem]"
                            src={image}
                            alt="Product"
                        />
                    ) : (
                        "No image"
                    )}
                </div>
                <input
                    type="file"
                    id="input-file"
                    className="hidden"
                    ref={selectFile}
                    onChange={handleFileChange}
                ></input>
                <div className="flex justify-end">
                    <button
                        className="btn btn-success mt-[1rem]"
                        onClick={handleFileClick}
                    >
                        사진 등록
                    </button>
                </div>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="상품 이름"
                    className="input input-bordered input-accent w-full max-w-xs block mb-[1rem] border-2 border-green-400"
                    name="name"
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="상품 가격"
                    className="input input-bordered input-accent w-full max-w-xs block mb-[1rem] border-2 border-green-400"
                    name="price"
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="재고 수량 입력"
                    className="input input-bordered input-accent w-full max-w-xs block mb-[1rem] border-2 border-green-400"
                    name="quantity"
                    onChange={handleInputChange}
                />
                <div className="flex justify-end">
                    <button className="btn btn-success" onClick={deleteProduct}>
                        항목 삭제
                    </button>
                </div>
            </div>
        </div>
    );
}
