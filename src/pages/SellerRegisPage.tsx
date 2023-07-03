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

        <div className="max-w-7xl mx-auto ">
            <div className="py-3 pt-10 relative border-b py-[2rem] mb-10 lg:border-none">
        <div className="flex justify-center text-2xl font-bold">
            셀러 등록
            </div>
            </div>
            <div className="lg:flex lg:justify-center">
            <div className="lg:mr-10 lg:pr-10 lg:flex lg:items-center lg:-mt-10 lg:border-r lg:pr-16">
                <div>
                <div className="flex justify-center">
                    <div className="border-[1px] border-indigo-500 rounded-lg h-[13rem] w-[20rem] flex justify-center items-center">
                        {image ? (
                            <img
                                className="h-[12rem] w-[19rem]"
                                src={image}
                                alt="Product"
                            />
                        ) : (
                            "스토어 사진을 등록하세요."
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
                <div className="flex justify-center">
                    <button
                        className="btn bg-indigo-400 hover:bg-indigo-300 mt-[1rem] mb-3"
                        onClick={handleFileClick}
                    >
                        사진 등록
                    </button>
                </div>
                </div>
            </div>
            <div>
                <form className="pb-8">
                    <div className="flex justify-center mt-3">
                        <div className="flex">
                            <label className="block text-center w-[105px] flex justify-end items-center mr-2 md:mr-8">
                                팝업스토어 이름
                            </label>
                            <input
                                type="text"
                                placeholder="팝업스토어 이름"
                                className="input input-bordered input-accent w-30 max-w-xs border-indigo-500 hover:border-indigo-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-3">
                        <div className="flex">
                            <label className="block text-center w-[105px] flex justify-end items-center mr-2 md:mr-8">
                                주소
                            </label>
                            <input
                                type="text"
                                placeholder="주소"
                                className="input input-bordered w-30 input-accent max-w-xs border-indigo-500 hover:border-indigo-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex mt-3">
                            <label className="block text-center w-[105px] flex justify-end items-center mr-2 md:mr-8">
                                운영 시간
                            </label>
                            <input
                                type="text"
                                placeholder="h"
                                className="input input-bordered input-accent max-w-[3rem] border-indigo-500 hover:border-indigo-500 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="m"
                                className="input input-bordered input-accent max-w-[3rem] mx-0.5 border-indigo-500 hover:border-indigo-500 focus:outline-none"
                            />
                            <span className="flex justify-end items-center">~</span>
                            <input
                                type="text"
                                placeholder="h"
                                className="input input-bordered input-accent max-w-[3rem] mx-0.5 border-indigo-500 hover:border-indigo-500 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="m"
                                className="input input-bordered input-accent max-w-[3rem] border-indigo-500 hover:border-indigo-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex mt-3">
                            <label className="block text-center w-[105px] flex justify-end items-center mr-2 md:mr-8">
                                운영 기간
                            </label>
                            <input
                                type="text"
                                placeholder="m"
                                className="input input-bordered input-accent max-w-[3rem] border-indigo-500 hover:border-indigo-500 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="d"
                                className="input input-bordered input-accent max-w-[3rem] mx-0.5 border-indigo-500 hover:border-indigo-500 focus:outline-none"
                            />
                            <span className="flex justify-end items-center">~</span>
                            <input
                                type="text"
                                placeholder="m"
                                className="input input-bordered input-accent max-w-[3rem] mx-0.5 border-indigo-500 hover:border-indigo-500 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="d"
                                className="input input-bordered input-accent max-w-[3rem] border-indigo-500 hover:border-indigo-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex mt-3">
                            <label className="block text-center flex w-[105px] justify-end items-center mr-2 md:mr-8">
                                스토어 구분
                            </label>
                            <select className="border-indigo-500 px-[72px] hover:border-indigo-500 focus:outline-none select select-primary">
                                <option disabled selected></option>
                                <option>팝업 스토어</option>
                                <option>플리 마켓</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex mt-3">
                            <label className="block text-center flex w-[105px] justify-end items-center mr-2 md:mr-8">
                                사업자등록번호
                            </label>
                            <input
                                type="text"
                                placeholder="사업자등록번호"
                                className="input input-bordered input-accent w-30 max-w-xs border-indigo-500 hover:border-indigo-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="button"
                            className="btn bg-indigo-400 hover:bg-indigo-300 m-[2rem]"
                        >
                            등록하기
                        </button>
                        <button
                            type="button"
                            className="btn bg-indigo-400 hover:bg-indigo-300 m-[2rem]"
                        >
                            수정하기
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
}