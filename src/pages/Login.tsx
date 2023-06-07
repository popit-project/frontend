import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import google from '../icon/google.256x256.png'
import naver from '../icon/naver-line.256x233.png'
import kakao from '../icon/kakaotalk.256x236.png'


export default function Login() {
    // const navigate = useNavigate();

    function handleClick() {
        //navigate(메인페이지 주소)
    }

    return (
        <>
            <Nav />
            <div className="loginForm">
                <form>
                    <input
                        type="text"
                        placeholder="아이디"
                        className="input input-bordered input-success w-full max-w-xs block mb-[3rem] mt-[8rem] mx-auto"
                    />
                    <input
                        type="text"
                        placeholder="비밀번호"
                        className="input input-bordered input-success w-full max-w-xs block mb-[3rem] mx-auto"
                    />
                    <button className="btn btn-wide bg-green-500 max-w-xs w-full mb-[3rem]" onClick={handleClick}>
                        로그인
                    </button>
                </form>
            </div>
            <div className="mb-[2rem]">SNS로 로그인하기</div>
            <div className="connect flex justify-center mb-[3rem]">
                <img className="w-8 h-8 mx-auto" src={google}></img>
                <img className="w-8 h-8 mx-auto" src={naver}></img>
                <img className="w-8 h-8 mx-auto" src={kakao}></img>
            </div>
            <button className="btn btn-success mr-[1rem]">회원가입</button>
            <button className="btn btn-success ">비밀번호 찾기</button>
        </>
    );
}