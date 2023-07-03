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



//질문내용 : 중간 데이터 삭제시 뒤에 데이터들 적혀있던게 사라짐!



export default function ProductComp() {
    const selectFile = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | null>(null);   
    const [ps, setPs] = useState({itemNm:"" , price: "", stockNumber:""});
     const formDataRef = useRef<FormData>(new FormData());
    
    useEffect(() => {        
        console.log(ps);
    }, [ps]);
  

    const onRegis = () => {
        const formData = formDataRef.current
        formData.append("itemNm", ps.itemNm);
        formData.append("price", ps.price);
        formData.append("stockNumber", ps.stockNumber);
        
        for (const key of formData.keys()) {
            console.log(key);
        }

        /* value 확인하기 */
        for (const value of formData.values()) {
            console.log(value);
        }


        axiosInstance.post("http://3.34.149.107:8082/api/seller/profile/item/add", { formData }, {
            headers: {
            Authorization : localStorage.getItem("token")
        }});
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
            formDataRef.current.append("file", file);
            
        }
        console.log(formDataRef.current.get("file"));
    };
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        setPs((prev) => {
            return { ...prev, [name] : value};
        })
        
    };
  

    return (
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
                <input
                    type="file"
                    id="input-file"
                    className="hidden"
                    ref={selectFile}
                    onChange={handleFileChange}
                ></input>
                <div className="flex justify-end">
                    <button
                        className="btn bg-indigo-400 hover:bg-indigo-300 mt-[1rem]"
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
    );
}
