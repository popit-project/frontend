import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function SignUp() {
    // const navigate = useNavigate();

    function handleClick() {
        //navigate(메인페이지 주소);
    }

    const data = {
        "userId": "YH",
        "password": "1",
        "nickname": "YHYH",
        "email": "123@naver.com",
        "phone" : "010-1111-1111"
    }

    useEffect(() => {
        fetch(
            "http://3.34.149.107:8082/api/user",
            {
                method: "GET"                   
            }
        ).then((response) => console.log(response));
    },[]);



    return (
        <>
            <Nav />
            <div className="signUpForm">
                <form>
                    <div className="form-control w-full max-w-xs mx-auto mt-[3rem]">
                        <label className="label">
                            <span className="label-text">아이디</span>
                        </label>
                        <input
                            type="text"
                            placeholder="아이디"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs mx-auto mt-[3rem]">
                        <label className="label">
                            <span className="label-text">비밀번호</span>
                        </label>
                        <input
                            type="text"
                            placeholder="비밀번호"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs mx-auto mt-[3rem]">
                        <label className="label">
                            <span className="label-text">비밀번호 확인</span>
                        </label>
                        <input
                            type="text"
                            placeholder="비밀번호 확인"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs mx-auto mt-[3rem]">
                        <label className="label">
                            <span className="label-text">이메일</span>
                        </label>
                        <input
                            type="text"
                            placeholder="이메일"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs mx-auto mt-[3rem]">
                        <label className="label">
                            <span className="label-text">핸드폰 번호</span>
                        </label>
                        <input
                            type="text"
                            placeholder="핸드폰 번호"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                </form>
                <button className="btn btn-wide bg-green-500 max-w-xs w-full mb-[3rem] mt-[3rem]" onClick={handleClick}>
                    회원가입 완료
                </button>
            </div>
        </>
    );
}