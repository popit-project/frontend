import { useRef, useState,useEffect } from "react";
import {
    atom,
    useRecoilState,
    useSetRecoilState,
    useRecoilValue,
} from "recoil";
import { productListAtom } from "../recoilAtom/ProductListAtom";
import { productDataAtom } from "../recoilAtom/ProductDataAtom";
import { axiosInstance } from "./AxiosInstance/AxiosConfig";
import axios from "axios";



//질문내용 : 중간 데이터 삭제시 뒤에 데이터들 적혀있던게 사라짐!

interface info{
    price: string | number;
    name: string;
    imageUrl: string;
    stock: string | number;
    bt: number;
    productId: number;
}

export default function ProductComp({price,name,imageUrl,stock,bt,productId}:info) {
    const selectFile = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | null>(null);   
    const [ps, setPs] = useState({itemNm:"" , price:"", stockNumber:""});
    const formDataRef = useRef<FormData>(new FormData());
    
    useEffect(() => {
        setImage(imageUrl);
    },[])
    useEffect(() => {
        console.log(ps);
        const userId = localStorage.getItem("userId");
        const responseGet = async () => {
            const response = await axiosInstance.get(
                `http://3.34.149.107:8082/api/seller/${userId}/storeHome`,
                {
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log(response.data)
        }
        responseGet();
    }, [ps]);
    
    const update = () => {
        console.log("put")
        

        axiosInstance.put(
            `http://3.34.149.107:8082/api/seller/profile/item/update/${productId}`,
            ps,
            
        );
    }

    const onRegis = () => {
        const formData = formDataRef.current
        
        formData.append(
            "itemInput",
            JSON.stringify({
                itemNm: ps.itemNm,
                price: parseInt(ps.price),
                stockNumber: parseInt(ps.stockNumber),
            })
        );
        
        for (const key of formData.keys()) {
            console.log(key);
        }

        /* value 확인하기 */
        for (const value of formData.values()) {
            console.log(value);
        }

        console.log(localStorage.getItem("token"));
        axiosInstance.post(
            "http://3.34.149.107:8082/api/seller/profile/item/add",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
               
            }
        );
    }

    const deleteItem = () => {
         axiosInstance.delete(
            `http://3.34.149.107:8082/api/seller/profile/item/delete/${productId}`,
             
        );
    }
    

    const handleFileClick = () => {
        if (selectFile.current !== null && selectFile.current !== undefined) {
            selectFile.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];        
        
        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const uploadedImage = reader.result as string;
                setImage(uploadedImage);
            };
            reader.readAsDataURL(file);
            formDataRef.current = new FormData();
            formDataRef.current.append("file", file);
            
        }
        console.log(formDataRef.current.get("file"));
        if (bt === 1) {
            axiosInstance.put(
                `http://3.34.149.107:8082/api/seller/item/${productId}/image`,
                formDataRef.current,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                        "Content-Type": "multipart/form-data",
                    },
                    // transformRequest: [
                    //     function () {
                    //         return formData;
                    //     },
                    // ],
                }
                
            );
            console.log("bt가 1입니다.");
            
        }
    };
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        setPs((prev) => {
            return { ...prev, [name] : value};
        })
        
    };
  

    return (
        <div>
            <div>
                <div className="flex ]justify-center mb-[3rem]">
                    <div className="mr-[2rem]">
                        <div className="border-2 border-indigo-500 rounded-lg h-[11rem] w-[11rem] flex justify-center items-center">
                            {image ? (
                                <img
                                    className="h-[10rem] w-[10rem]"
                                    src={image}
                                    alt="product"
                                />
                            ) : (
                                "No Image"
                            )}
                        </div>
                        <input
                            type="file"
                            id="input-file"
                            className="hidden"
                            ref={selectFile}
                            onChange={handleFileChange}
                        ></input>
                        <div className="flex justify-center">
                            {bt === 0 ? (
                                <button
                                    className="btn bg-indigo-400 hover:bg-indigo-300 mt-[1rem]"
                                    onClick={handleFileClick}
                                >
                                    사진 등록
                                </button>
                            ) : (
                                <button
                                    className="btn bg-indigo-400 hover:bg-indigo-300 mt-[1rem]"
                                    onClick={handleFileClick}
                                >
                                    사진 수정
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex border-[1px] border-indigo-500 p-2 rounded-md mb-[2rem] bg-indigo-50">
                <div className="mr-[2rem]">
                    <div className="border-[1px] border-indigo-500 rounded-lg h-[11rem] w-[11rem] flex justify-center items-center bg-white">
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
                    <div>
                        <input
                            type="text"
                            placeholder={`${name}`}
                            className="input input-accent w-full max-w-xs block mb-[1rem] border-2 border-indigo-500 focus:outline-indigo-500"
                            name="itemNm"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder={`${price}`}
                            className="input input-accent w-full max-w-xs block mb-[1rem] border-2 border-indigo-500 focus:outline-indigo-500"
                            name="price"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder={`${stock}`}
                            className="input input-accent w-full max-w-xs block mb-[1rem] border-2 border-indigo-500 focus:outline-indigo-500"
                            name="stockNumber"
                            onChange={handleInputChange}
                        />
                        <div className="flex justify-center">
                            {bt === 0 ? (
                                <button
                                    className="btn bg-indigo-400 hover:bg-indigo-300"
                                    onClick={onRegis}
                                >
                                    상품 등록
                                </button>
                            ) : (
                                <div>
                                    <button
                                        className="btn bg-indigo-400 hover:bg-indigo-300 mr-[1rem]"
                                        onClick={update}
                                    >
                                        상품 수정
                                    </button>
                                    <button
                                        className="btn bg-indigo-400 hover:bg-indigo-300"
                                        onClick={deleteItem}
                                    >
                                        상품 삭제
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="상품 이름"
                        className="input input-accent w-full max-w-xs block mb-[1rem] border-[1px] border-indigo-500 focus:outline-indigo-500"
                        name="itemNm"
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="상품 가격"
                        className="input input-accent w-full max-w-xs block mb-[1rem] border-[1px] border-indigo-500 focus:outline-indigo-500"
                        name="price"
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="재고 수량 입력"
                        className="input input-accent w-full max-w-xs block mb-[1rem] border-[1px] border-indigo-500 focus:outline-indigo-500"
                        name="stockNumber"
                        onChange={handleInputChange}
                    />
                    <div className="flex justify-end">
                        <button
                            className="btn bg-indigo-400 hover:bg-indigo-300"
                            onClick={onRegis}
                        >
                            상품 등록
                        </button>
                    </div>                
                </div>
            </div>
        </div>
    );
}
