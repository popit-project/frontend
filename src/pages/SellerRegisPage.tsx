import { ChangeEvent, useState,useRef } from "react";
import Nav from "../components/LoginNav";
import Footer from "../components/Footer";

//userId를 localstorage에서 받아와서 userId랑 이미지url , 팝업스토어 이름, 주소, 운영시간 보내기. POST

//수정하기는 PUT보내서 수정하는 방식으로 하면됌.


export default function SellerRegisPage() {
    const selectFile = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | null>(null);
    const sellerId = localStorage.getItem("userId");
    const [storeData, setStoreData] = useState({
        img: "",
        storeName: "",
        sotreAddress: "",
        openTime: "",
        closedTime: "",
        openDate: "",
        closedDate: "",
        storeType: "",
        businessNumber:""
    })

  
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

    const handleFileClick = () => {
        if (selectFile.current !== null && selectFile.current !== undefined) {
            selectFile.current.click();
        }
    };

    return (
        <div>
            <div className="w-screen flex justify-center mt-[2rem]">
                <div className="border-[1px] border-indigo-500 rounded-lg h-[13rem] w-[20rem] flex justify-center items-center">
                    {image ? (
                        <img
                            className="h-[12rem] w-[19rem]"
                            src={image}
                            alt="Product"
                        />
                    ) : (
                        "No image"
                    )}
                </div>
            </div>
            <input
                type="file"
                id="input-file"
                className="hidden"
                ref={selectFile}
                onChange={handleFileChange}
            ></input>
            <div className="w-screen flex justify-center">
                <button
                    className="btn bg-indigo-400 hover:bg-indigo-300 mt-[1rem]"
                    onClick={handleFileClick}
                >
                    사진 등록
                </button>
            </div>
            <div>
                <form>
                    <div className="flex justify-center w-screen">
                        <div>
                            <label className="block text-2xl text-center mt-[2rem] ">
                                팝업스토어 이름
                            </label>
                            <input
                                type="text"
                                placeholder="팝업스토어 이름"
                                className="input input-bordered input-accent w-screen max-w-xs mt-[1rem] mb-[1rem] border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center w-screen">
                        <div>
                            <label className="block text-2xl text-center mt-[2rem]">
                                주소
                            </label>
                            <input
                                type="text"
                                placeholder="주소"
                                className="input input-bordered input-accent w-screen max-w-xs mt-[1rem] mb-[1rem] border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center w-screen">
                        <div>
                            <label className="block text-2xl text-center mt-[2rem]">
                                운영 시간
                            </label>
                            <input
                                type="text"
                                placeholder="h"
                                className="input input-bordered input-accent max-w-[3.5rem] mt-[1rem] mb-[1rem] mr-[1rem] border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500"
                            />
                            <input
                                type="text"
                                placeholder="m"
                                className="input input-bordered input-accent max-w-[3.5rem] mt-[1rem] mb-[1rem] mr-[1rem] border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500"
                            />
                            <span className="text-xl mr-[1rem]">~</span>
                            <input
                                type="text"
                                placeholder="h"
                                className="input input-bordered input-accent max-w-[3.5rem] mt-[1rem] mb-[1rem] mr-[1rem] border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500"
                            />
                            <input
                                type="text"
                                placeholder="m"
                                className="input input-bordered input-accent max-w-[3.5rem] mt-[1rem] mb-[1rem] border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center w-screen">
                        <div>
                            <label className="block text-2xl text-center mt-[2rem]">
                                운영 기간
                            </label>
                            <input
                                type="text"
                                placeholder="m"
                                className="input input-bordered input-accent max-w-[3.5rem] mt-[1rem] mb-[1rem] mr-[1rem] border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500"
                            />
                            <input
                                type="text"
                                placeholder="d"
                                className="input input-bordered input-accent max-w-[3.5rem] mt-[1rem] mb-[1rem] mr-[1rem] border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500"
                            />
                            <span className="text-xl mr-[1rem]">~</span>
                            <input
                                type="text"
                                placeholder="m"
                                className="input input-bordered input-accent max-w-[3.5rem] mt-[1rem] mb-[1rem] mr-[1rem] border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500"
                            />
                            <input
                                type="text"
                                placeholder="d"
                                className="input input-bordered input-accent max-w-[3.5rem] mt-[1rem] mb-[1rem] border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center w-screen">
                        <div>
                            <label className="block text-2xl text-center mt-[2rem]">
                                스토어 구분
                            </label>
                            <select className="border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500 select select-primary w-screen max-w-xs mt-[2rem]">
                                <option disabled selected></option>
                                <option>팝업 스토어</option>
                                <option>플리 마켓</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center w-screen">
                        <div>
                            <label className="block text-2xl text-center mt-[2rem]">
                                사업자등록번호
                            </label>
                            <input
                                type="text"
                                placeholder="사업자등록번호"
                                className="input input-bordered input-accent w-screen max-w-xs mt-[1rem] mb-[1rem] border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="w-screen flex justify-center">
                        <button
                            type="button"
                            className="btn bg-indigo-400 hover:bg-indigo-300 m-[2rem] "
                        >
                            등록하기
                        </button>
                        <button
                            type="button"
                            className="btn bg-indigo-400 hover:bg-indigo-300 m-[2rem] "
                        >
                            수정하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}