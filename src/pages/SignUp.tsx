import Nav from "../components/LoginNav";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

//스웨거에 있는 api참조해서 로그인 회원가입 쪽 기능 구현 다 해보기.
//정리 : api/user/register 일단 완료. login도 완료.
//닉네임란 만들기(회원가입 정보데이터에)

export default function SignUp() {
    // const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ userId: "", password: "", passwordCheck: "", email: "", phone: "" });

    useEffect(() => {
        console.log(userInfo)
    },[userInfo])

    function handleClick() {
        

        //navigate(메인페이지 주소);
    }

    const changeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo((prev) => (
            {...prev, [name] : value}
        ));
    }

    return (
        <>
            <Nav />
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
                            type="text"
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
                            type="text"
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
                        className="btn bg-violet-400 hover:bg-violet-300 max-w-xs mb-[3rem] mt-[3rem] w-screen mx-auto"
                        onClick={handleClick}
                    >
                        회원가입 완료
                    </button>
                </div>
            </div>
        </>
    );
}