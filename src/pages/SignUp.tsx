import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SignUp() {
    // const navigate = useNavigate();

    function handleClick() {
        //navigate(메인페이지 주소);
    }

    useEffect(() => {
        fetch("http://3.34.149.107:8081/user/register", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    });



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