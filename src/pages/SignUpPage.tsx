import Nav from "../components/LoginNav";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";
import Loading from "../components/Loading";

//현재 register login info find-id 전부다 동작

export default function SignUpPage() {
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({
        email: "",
        nickname: "",
        password: "",
        passwordCheck: "",
        phone: "",
        userId: "",
    });

    useEffect(() => {
        console.log(userInfo)
    },[userInfo])

    async function handleClick() {
        setLoading(true);
        try {
            const response = await axiosInstance.post(
                "http://3.34.149.107:8082/api/user/register",userInfo
                
            );
            window.location.href = "/login";
          
        } catch (error) {
            alert(`${error}`)
        }
        //navigate(메인페이지 주소);
        setLoading(false);
    }

    const changeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo((prev) => (
            {...prev, [name] : value}
        ));
    }

    return (
        <>
            {loading === true ? (
                <Loading />
            ) : (
                <div className="max-w-7xl my-0 mx-auto mb-[10rem]">
                    <div className="signUpForm">
                        <form className="w-screen">
                            <div className="form-control w-full max-w-xs mx-auto mt-[3rem]">
                                <label className="label">
                                    <span className="label-text text-2xl mb-[1rem]">
                                        아이디
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="아이디"
                                    className="input input-bordered w-full max-w-xs"
                                    name="userId"
                                    onChange={changeInfo}
                                />
                            </div>
                            <div className="form-control w-full max-w-xs mx-auto mt-[3rem]">
                                <label className="label">
                                    <span className="label-text text-2xl mb-[1rem]">
                                        비밀번호
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="비밀번호"
                                    className="input input-bordered w-full max-w-xs"
                                    name="password"
                                    onChange={changeInfo}
                                />
                            </div>
                            <div className="form-control w-full max-w-xs mx-auto mt-[3rem]">
                                <label className="label">
                                    <span className="label-text text-2xl mb-[1rem]">
                                        비밀번호 확인
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="비밀번호 확인"
                                    className="input input-bordered w-full max-w-xs"
                                    name="passwordCheck"
                                    onChange={changeInfo}
                                />
                            </div>
                            <div className="form-control w-full max-w-xs mx-auto mt-[3rem]">
                                <label className="label">
                                    <span className="label-text text-2xl mb-[1rem]">
                                        이메일
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="이메일"
                                    className="input input-bordered w-full max-w-xs"
                                    name="email"
                                    onChange={changeInfo}
                                />
                            </div>
                            <div className="form-control w-full max-w-xs mx-auto mt-[3rem]">
                                <label className="label">
                                    <span className="label-text text-2xl mb-[1rem]">
                                        닉네임
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="닉네임"
                                    className="input input-bordered w-full max-w-xs"
                                    name="nickname"
                                    onChange={changeInfo}
                                />
                            </div>
                            <div className="form-control w-full max-w-xs mx-auto mt-[3rem]">
                                <label className="label">
                                    <span className="label-text text-2xl mb-[1rem]">
                                        핸드폰 번호
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="핸드폰 번호"
                                    className="input input-bordered w-full max-w-xs"
                                    name="phone"
                                    onChange={changeInfo}
                                />
                            </div>
                        </form>
                        <div className="form-control w-screen">
                            <button
                                className="btn bg-indigo-400 hover:bg-indigo-300 max-w-xs mb-[3rem] mt-[8rem] w-screen mx-auto"
                                onClick={handleClick}
                            >
                                회원가입 완료
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}