import React, { useEffect, useState } from "react";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";
import Loading from "../components/Loading";

//현재 register login info find-id 전부다 동작

export default function SignUpPage() {
    const [loading, setLoading] = useState(false);
    const [pwChk, setPwChk] = useState(false);
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
        
        if (userInfo.password !== "" && userInfo.passwordCheck !== "" && userInfo.password !== userInfo.passwordCheck) {
            setPwChk(true);
            
        }      
        else {
            setPwChk(false);
        }
        
    },[userInfo])

    async function handleClick() {
        setLoading(true);
        try {
            const response = await axiosInstance.post(
                "https://pop-it.store/api/user/register",userInfo
                
            );
            console.log(response.data);
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

    const idAuth = async () => {
        try {
            const response = await axiosInstance.get(
                "https://pop-it.store/api/user/info", {
                    params: {
                        userId:userInfo.userId,
                    }
                }
            );
            console.log(response.data);
            alert("사용 불가능한 아이디 입니다.");           
        }
        catch (error) {
            alert("사용 가능한 아이디 입니다.")
        }           
        
    }

    return (
        <>
            {loading === true ? (
                <Loading />
            ) : (
                <div className="max-w-7xl my-0 mx-auto mb-[10rem]">
                    <div className="signUpForm">
                        <div className="w-full">
                            <div className="form-control w-full max-w-xs mx-auto mt-[3rem]">
                                <label className="label">
                                    <span className="label-text text-2xl mb-[1rem]">
                                        아이디
                                    </span>
                                    <button className="btn bg-indigo-400 hover:bg-indigo-300" onClick={idAuth}>
                                        중복확인
                                    </button>
                                </label>
                                <input
                                    type="text"
                                    placeholder="아이디"
                                    className="input input-bordered w-full max-w-xs"
                                    name="userId"
                                    onChange={changeInfo}
                                />
                            </div>
                            <div className="form-control w-full max-w-xs mx-auto mt-[1.5rem]">
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
                            <div className="form-control w-full max-w-xs mx-auto mt-[1.5rem]">
                                <label className="label">
                                    <span className="label-text text-2xl mb-[1rem]">
                                        비밀번호 확인
                                    </span>
                                    {pwChk === true ? (
                                        <span className="text-red-600 text-md font-bold">
                                            비밀번호 불일치
                                        </span>
                                    ) : (
                                        <></>
                                    )}
                                </label>
                                <input
                                    type="password"
                                    placeholder="비밀번호 확인"
                                    className="input input-bordered w-full max-w-xs"
                                    name="passwordCheck"
                                    onChange={changeInfo}
                                />
                            </div>
                            <div className="form-control w-full max-w-xs mx-auto mt-[1.5rem]">
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
                            <div className="form-control w-full max-w-xs mx-auto mt-[1.5rem]">
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
                            <div className="form-control w-full max-w-xs mx-auto mt-[1.5rem]">
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
                        </div>
                        <div className="form-control w-full">
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