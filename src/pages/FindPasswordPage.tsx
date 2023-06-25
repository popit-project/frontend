import Nav from "../components/LoginNav";
import Footer from "../components/Footer";
import { useState } from "react";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";

export default function FindPasswordPage() {
    // 정상동작. POST한 이메일주소로 새로운 비밀번호 날아감.
    
    const [emailInfo, setEmailInfo] = useState({ email: "" });

    const changeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmailInfo((prevData) => ({ ...prevData, [name]: value }));
        console.log(emailInfo);
    };


    const sendRequest = async () => {
        try {
            const response = await axiosInstance.post(
                "http://3.34.149.107:8082/api/user/reset-password",
                emailInfo
            );
            alert(response.data);
        } catch (error) {
            alert(`${error}`);
        }
    };

    return (
        <>
            <Nav />
            <div className="w-screen flex justify-center mx-auto mt-[3rem] mb-[3rem]">
                <div>
                    <label className="label">
                        <span className="label-text text-2xl mb-[1rem]">
                            가입 시 사용한 이메일을 입력해주세요
                        </span>
                    </label>
                    <input
                        type="text"
                        placeholder="이메일"
                        className="input w-screen input-bordered max-w-md"
                        name="email"
                        onChange={changeInfo}
                    />
                </div>
            </div>
            <div className="w-screen flex justify-center">
                <button
                    className="btn bg-violet-400 hover:bg-violet-300 mr-[1rem] mb-[20rem]"
                    onClick={sendRequest}
                >
                    패스워드 찾기
                </button>
            </div>
            <Footer />
        </>
    );
}
