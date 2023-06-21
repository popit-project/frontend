import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import google from '../icon/google.256x256.png'
import naver from '../icon/naver-line.256x233.png'
import kakao from '../icon/kakaotalk.256x236.png'
import { Axios } from "axios";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";
import { useState } from "react";


export default function Login() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({userId : '', password: ''});

    const loginRequest = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post("http://3.34.149.07:8082/api/user/login", loginData);
            
            const { accessToken, refreshToken } = response.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            navigate("/main");
        }
        catch (error) {
            console.error('로그인 실패', error);
        }
        
    }

    const changeData = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
    }

    

    return (
        <>
            <Nav />
            <div className="loginForm">
                <form onSubmit={loginRequest}>
                    <input
                        type="text"
                        placeholder="아이디"
                        name="userId"
                        onChange={changeData}
                        className="input input-bordered input-success w-full max-w-xs block mb-[3rem] mt-[8rem] mx-auto"
                    />
                    <input
                        type="text"
                        placeholder="비밀번호"
                        name="password"
                        onChange={changeData}
                        className="input input-bordered input-success w-full max-w-xs block mb-[3rem] mx-auto"
                    />
                    <button type="button" className="btn btn-wide bg-green-500 max-w-xs w-full mb-[3rem]">
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