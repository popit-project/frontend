import { useState } from "react";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";

export default function FindIdPage() {
    const [emailInfo, setEmailInfo] = useState({ email: "" });

    const changeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmailInfo((prevData) => ({ ...prevData, [name]: value }));
        console.log(emailInfo);
    };

    //여기에서 인터셉터 써보기.

    //일단 정상동작함.
    //async await의 힘은 동작이 끝난 결과를 받아와서 쓸수있다는것 . 밑의 함수가 그냥 함수였으면 response에서 data를 받아오질 못함. 
    const sendRequest = async () => {
        try {
            const response = await axiosInstance.post(
                "http://3.34.149.107:8082/api/user/find-id",
                emailInfo
            );
            alert(response.data);
        } catch (error) {
            alert(`${error}`);
        }
    };

    return (
        <div className="max-w-7xl my-0 mx-auto mb-[10rem]">
            <div className="flex justify-center mx-auto mt-[3rem] mb-[3rem]">
                <div>
                    <label className="label">
                        <span className="label-text text-2xl mb-[1rem]">
                            가입 시 사용한 이메일을 입력해주세요
                        </span>
                    </label>
                    <input
                        type="text"
                        placeholder="이메일"
                        className="input w-[350px] input-bordered"
                        name="email"
                        onChange={changeInfo}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    className="btn bg-indigo-400 hover:bg-indigo-300 mr-[1rem] mb-[20rem] mt-[3rem]"
                    onClick={sendRequest}
                >
                    아이디 찾기
                </button>
            </div>
        </div>
    );
}