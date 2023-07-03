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
        closedTime: "",
        openDate: "",
        closedDate: "",
        storeType: "POPUP_STORE",
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

    const select = (e) => {
        setStoreData((prev) => {
            return { ...prev, storeType: e.target.value };
        })
    }

    const onRegis = () => {
        const formData = formDataRef.current;

        formData.append(
            "sellerDTO",
            JSON.stringify({
                storeName: storeData.storeName,
                storeAddress: storeData.storeAddress,
                openTime: storeData.openTime,
                closeTime: storeData.closedTime,
                openDate: storeData.openDate,
                closeDate: storeData.closedDate,
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

        axiosInstance.post(
            "http://3.34.149.107:8082/api/sellerEnter",
                formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    // token: localStorage.getItem("userId"),
                    "Content-Type": "multipart/form-data",
                },
                // transformRequest: [
                //     function () {
                //         return formData;
                //     },
                // ],
            }
        );
    };

    const update = () => {
        const updateData = new FormData();

        updateData.append(
            "updatedStoreDTO",
            JSON.stringify({
                storeAddress: storeData.storeAddress,
                openTime: storeData.openTime,
                closeTime: storeData.closedTime,
                openDate: storeData.openDate,
                closeDate: storeData.closedDate,
            })
        );

        axiosInstance.put(
            "http://3.34.149.107:8082/api/seller/sellerEnter",
            updateData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    }
    useEffect(() => {
        const storeInfo = async () => {
            const storeInfoData = await axiosInstance.get(
                `http://3.34.149.107:8082/api/seller/${localStorage.getItem(
                    "userId"
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

            setStoreData((prev) => {
                return {
                    ...prev,
                    storeName: tmp.storeName,
                    storeAddress: tmp.storeAddress,
                    openTime: tmp.openTime,
                    closeTime: tmp.closedTime,
                    openDate: storeData.openDate,
                    closeDate: storeData.closedDate,
                    storeType: storeData.storeType,
                    businessLicenseNumber: storeData.businessNumber,
                };
            });
           
        };

        storeInfo();
    },[])

    useEffect(() => {
        console.log(storeData)
        
    },[storeData])

    return (
        <div>
            <div className="w-full flex justify-center mt-[2rem]">
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
            <div className="w-full flex justify-center">
                <button
                    className="btn bg-indigo-400 hover:bg-indigo-300 mt-[1rem]"
                    onClick={handleFileClick}
                >
                    사진 등록
                </button>
            </div>
            <div>
                <form>
                    <div className="flex justify-center w-full">
                        <div>
                            <label className="block text-2xl text-center mt-[2rem] ">
                                팝업스토어 이름
                            </label>
                            <input
                                type="text"
                                name="storeName"
                                value={storeData.storeName}
                                placeholder="팝업스토어 이름"
                                onChange={handleInputChange}
                                className="input input-accent w-screen max-w-xs mt-[1rem] mb-[1rem] border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center w-full">
                        <div>
                            <label className="block text-2xl text-center mt-[2rem]">
                                주소
                            </label>
                            <input
                                type="text"
                                name="storeAddress"
                                value={storeData.storeAddress}
                                placeholder="주소"
                                onChange={handleInputChange}
                                className="input input-accent w-screen max-w-xs mt-[1rem] mb-[1rem] border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center w-full">
                        <div>
                            <label className="block text-2xl text-center mt-[2rem]">
                                운영 시간
                            </label>
                            <input
                                type="text"
                                placeholder="EX) 14:00"
                                name="openTime"
                                value={storeData.openTime}
                                onChange={handleInputChange}
                                className="input input-accent max-w-[8rem] mt-[1rem] mb-[1rem] mr-[1rem] border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500 text-center"
                            />

                            <span className="text-xl mr-[1rem]">~</span>

                            <input
                                type="text"
                                placeholder="20:00"
                                value={storeData.closedTime}
                                name="closedTime"
                                onChange={handleInputChange}
                                className="input input-accent max-w-[8rem] mt-[1rem] mb-[1rem] mr-[1rem] border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500 text-center"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center w-full">
                        <div>
                            <label className="block text-2xl text-center mt-[2rem]">
                                운영 기간
                            </label>
                            <input
                                type="text"
                                placeholder="EX) 5/1"
                                name="openDate"
                                value={storeData.openDate}
                                onChange={handleInputChange}
                                className="input input-accent max-w-[8rem] mt-[1rem] mb-[1rem] mr-[1rem] border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500 text-center"
                            />
                            <span className="text-xl mr-[1rem]">~</span>
                            <input
                                type="text"
                                placeholder="5/7"
                                name="closedDate"
                                value={storeData.closedDate}
                                onChange={handleInputChange}
                                className="input input-accent max-w-[8rem] mt-[1rem] mb-[1rem] mr-[1rem] border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500 text-center"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center w-full">
                        <div>
                            <label className="block text-2xl text-center mt-[2rem]">
                                스토어 구분
                            </label>
                            <select
                                className="border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500 select select-primary w-screen max-w-xs mt-[2rem]"
                                onClick={select}
                            >
                                <option disabled selected></option>
                                <option value="POPUP_STORE">팝업 스토어</option>
                                <option value="FELA_MARKET">플리 마켓</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center w-full">
                        <div>
                            <label className="block text-2xl text-center mt-[2rem]">
                                사업자등록번호
                            </label>
                            <input
                                type="text"
                                name="businessNumber"
                                onChange={handleInputChange}
                                value={storeData.businessNumber}
                                placeholder="사업자등록번호"
                                className="input input-accent w-screen max-w-xs mt-[1rem] mb-[1rem] border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
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
    );
}