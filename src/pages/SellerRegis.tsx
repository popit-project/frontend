import { ChangeEvent, useState } from "react";
import Nav from "../components/LoginNav";
import Footer from "../components/Footer";

export default function SellerRegis() {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');

    const handleFile = (e : ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <div>
            <Nav />
            <div className="flex justify-center w-screen">
                <input
                    type="file"
                    className="file-input file-input-bordered file-input-success w-full max-w-xs mt-[4rem]"
                    onChange={handleFile}
                />
            </div>
            <div className="flex justify-center w-screen">
                {previewUrl && (
                    <div>
                        <img
                            src={previewUrl}
                            className="w-[20rem] h-[15rem] mt-[3rem] mb-[3rem]"
                        ></img>
                    </div>
                )}
            </div>
            <div>
                <form className="w-screen">
                    <div>
                        <label className="block text-2xl">팝업스토어 이름</label>
                        <input
                            type="text"
                            placeholder="팝업스토어 이름"
                            className="input input-bordered input-accent w-full max-w-xs mt-[2rem] mb-[1rem]"
                        />
                    </div>
                    <div>
                        <label className="block text-2xl">주소</label>
                        <input
                            type="text"
                            placeholder="주소"
                            className="input input-bordered input-accent w-full max-w-xs mt-[2rem] mb-[1rem]"
                        />
                    </div>
                    <div>
                        <label className="block text-2xl">운영 시간</label>
                        <input
                            type="text"
                            placeholder="운영 시간"
                            className="input input-bordered input-accent w-full max-w-xs mt-[2rem] mb-[1rem]"
                        />
                    </div>
                    <button type="button" className="btn btn-success m-[2rem] ">
                        등록하기!
                    </button>
                </form>
            </div>
            <Footer/>
        </div>
    );
}