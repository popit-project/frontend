import { ChangeEvent, useState,useRef } from "react";
import Nav from "../components/LoginNav";
import Footer from "../components/Footer";

export default function SellerRegis() {
    const selectFile = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | null>(null);

  
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
            <Nav />
            <div className="w-screen flex justify-center mt-[2rem]">
                <div className="border-2 border-violet-500 rounded-lg h-[13rem] w-[20rem] flex justify-center items-center">
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
                    className="btn bg-violet-400 hover:bg-violet-300 mt-[1rem]"
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
                                className="input input-bordered input-accent w-screen max-w-xs mt-[1rem] mb-[1rem] border-violet-500 hover:border-violet-500 focus:outline-violet-500"
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
                                className="input input-bordered input-accent w-screen max-w-xs mt-[1rem] mb-[1rem] border-violet-500 hover:border-violet-500 focus:outline-violet-500"
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
                                placeholder="운영 시간"
                                className="input input-bordered input-accent w-screen max-w-xs mt-[1rem] mb-[1rem] border-violet-500 hover:border-violet-500 focus:outline-violet-500"
                            />
                        </div>
                    </div>
                    <div className="w-screen flex justify-center">
                        <button
                            type="button"
                            className="btn bg-violet-400 hover:bg-violet-300 m-[2rem] "
                        >
                            등록하기
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}