import { ChangeEvent, useState,useRef, useEffect} from "react";
import Nav from "../components/LoginNav";
import Footer from "../components/Footer";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";

//userId를 localstorage에서 받아와서 userId랑 이미지url , 팝업스토어 이름, 주소, 운영시간 보내기. POST

//수정하기는 PUT보내서 수정하는 방식으로 하면됌.


export default function SellerRegisPage() {
    const selectFile = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | null>(null);
    const sellerId = localStorage.getItem("userId");
    const formDataRef = useRef<FormData>(new FormData());
    const [storeData, setStoreData] = useState({
        storeName: "",
        storeAddress: "",
        openTime: "",
        closeTime: "",
        openDate: "",
        closeDate: "",
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
            formDataRef.current = new FormData();
            formDataRef.current.append("file", file);
        }
    };

    const handleFileClick = () => {
        if (selectFile.current !== null && selectFile.current !== undefined) {
            selectFile.current.click();
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        setStoreData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const select = (e: any) => {
        setStoreData((prev) => {
            return { ...prev, storeType: e.target.value };
        })
    }

    const onRegis = async () => {
        const formData = formDataRef.current;

        formData.append(
            "sellerDTO",
            JSON.stringify({
                storeName: storeData.storeName,
                storeAddress: storeData.storeAddress,
                openTime: storeData.openTime,
                closeTime: storeData.closeTime,
                openDate: storeData.openDate,
                closeDate: storeData.closeDate,
                storeType: storeData.storeType,
                businessLicenseNumber : storeData.businessNumber
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

        try {
            const tmp1 = async () => {
                const tmp2 = await axiosInstance.post(
                "http://3.34.149.107:8082/api/sellerEnter",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                            // token: localStorage.getItem("userId"),
                            "Content-Type": "multipart/form-data",
                        },
                        // transformRequest: [
                        //     function () {
                        //         return formData;
                        //     },
                        // ],
                    }
                )
                console.log(tmp2.data);
                localStorage.removeItem("sellerId");
                localStorage.setItem("sellerId", tmp2.data);
            }

            await tmp1();
            window.location.href = "/profile";
            
        } catch (error) {
            alert("스토어 등록에 실패했습니다.")
        }

        
    };

    const update = async () => {
        const updateData = {
            storeAddress: storeData.storeAddress,
            openTime: storeData.openTime,
            closeTime: storeData.closeTime,
            openDate: storeData.openDate,
            closeDate: storeData.closeDate,
        };        

        await axiosInstance.put(
            "http://3.34.149.107:8082/api/seller/sellerEnter",
            updateData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    // "Content-Type": "applica",
                },
            }
        );
            
        window.location.href = "/profile"
        
    }
    
    useEffect(() => {
        const storeInfo = async () => {
            const storeInfoData = await axiosInstance.get(
                `http://3.34.149.107:8082/api/seller/${localStorage.getItem(
                    "sellerId"
                )}/storeHome`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            console.log(storeInfoData.data);
            const tmp = storeInfoData.data;
            setImage(tmp.storeImage);

            setStoreData((prev) => {
                return {
                    ...prev,
                    storeName: tmp.storeName,
                    storeAddress: tmp.storeAddress,
                    openTime: tmp.openTime,
                    closeTime: tmp.closeTime,
                    openDate: tmp.openDate,
                    closeDate: tmp.closeDate,
                    storeType: tmp.storeType,
                    businessLicenseNumber: tmp.businessNumber,
                };
            });
           
        };

        storeInfo();
    },[])

    useEffect(() => {
        console.log(storeData)
        
    },[storeData])

    return (
        <div className="max-w-7xl mx-auto ">
        <div className="py-3 pt-10 relative border-b py-[2rem] mb-10 lg:border-none">
            <div className="flex justify-center text-2xl font-bold">
                셀러 등록
            </div>
        </div>
        <div className="lg:flex lg:justify-center lg:pl-[120px]">
            <div className="lg:flex lg:items-center lg:border-r lg:pr-10 lg:-ml-2">
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
            <div className="w-full flex justify-center">
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
                                name="storeName"
                                onChange={handleInputChange}
                                value={storeData.storeName}
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
                                name="storeAddress"
                                value={storeData.storeAddress}
                                placeholder="주소"
                                onChange={handleInputChange}
                                className="input input-bordered w-30 input-accent max-w-xs border-indigo-500 hover:border-indigo-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex mt-3 -ml-7 lg:ml-14">
                            <label className="block text-center w-[105px] flex justify-end items-center mr-2 md:mr-8">
                                운영 시간
                            </label>
                            <input
                                type="text"
                                placeholder="hh:mm"
                                name="openTime"
                                value={storeData.openTime}
                                onChange={handleInputChange}
                                className="input input-bordered input-accent max-w-[8rem] border-indigo-500 hover:border-indigo-500 focus:outline-none"
                            />
                            <span className="flex justify-end items-center">~</span>
                            <input
                                type="text"
                                placeholder="hh:mm"
                                value={storeData.closeTime}
                                name="closeTime"
                                onChange={handleInputChange}
                                className="input input-bordered input-accent max-w-[8rem] mx-0.5 border-indigo-500 hover:border-indigo-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex mt-3 -ml-7 lg:ml-14">
                            <label className="block text-center w-[105px] flex justify-end items-center mr-2 md:mr-8">
                                운영 기간
                            </label>
                            <input
                                type="text"
                                placeholder="yyyy-mm-dd"
                                name="openDate"
                                value={storeData.openDate}
                                onChange={handleInputChange}
                                className="input input-bordered input-accent max-w-[8rem] border-indigo-500 hover:border-indigo-500 focus:outline-none"
                            />
                            <span className="flex justify-end items-center">~</span>
                            <input
                                type="text"
                                placeholder="yyyy-mm-dd"
                                name="closeDate"
                                value={storeData.closeDate}
                                onChange={handleInputChange}
                                className="input input-bordered input-accent max-w-[8rem] border-indigo-500 hover:border-indigo-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex mt-3">
                            <label className="block text-center flex w-[105px] justify-end items-center mr-2 md:mr-8">
                                스토어 구분
                            </label>
                            <select
                                className="border-indigo-500 px-[72px] hover:border-indigo-500 focus:outline-none select select-primary"
                                onChange={select}
                            >
                                <option disabled selected></option>
                                <option value="POPUP_STORE">팝업 스토어</option>
                                <option value="FLEA_MARKET">플리 마켓</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center w-full">
                        <div className="flex mt-3">
                            <label className="block text-center flex w-[105px] justify-end items-center mr-2 md:mr-8">
                                사업자등록번호
                            </label>
                            <input
                                type="text"
                                name="businessNumber"
                                onChange={handleInputChange}
                                value={storeData.businessNumber}
                                placeholder="사업자등록번호"
                                className="input input-bordered input-accent w-30 max-w-xs border-indigo-500 hover:border-indigo-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="button"
                            className="btn bg-indigo-400 hover:bg-indigo-300 m-[2rem] "
                            onClick={onRegis}
                        >
                            등록하기
                        </button>
                        <button
                            type="button"
                            onClick={update}
                            className="btn bg-indigo-400 hover:bg-indigo-300 m-[2rem] "
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
