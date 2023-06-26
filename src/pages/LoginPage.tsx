import { redirect } from "react-router-dom";
import google from "../icon/google.256x256.png";
import naver from "../icon/naver-line.256x233.png";
import kakao from "../icon/kakaotalk.256x236.png";
import { Link } from "react-router-dom";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { LoginTokenAtom } from "../recoilAtom/LoginTokenAtom";

//구글로그인은 -> 버튼클릭하면 api/google호출해서 응답받은걸로(url) navigate를 하면은 그 url로 이동하기 !
//로그아웃 버튼이 있어야하고. 로그아웃을 하면 localStorage에서 로그인 아이디 및 인증토큰들을 다 지워야함.

export default function LoginPage() {
    const [loginData, setLoginData] = useState({ userId: "", password: "" });
    const [isLoggedIn,setIsLoggedIn] = useRecoilState(LoginTokenAtom);      
    
  const loginRequest = async () => { 
    try {
        const response = await axiosInstance.post(
            "http://3.34.149.107:8082/api/user/login", loginData
            
        );

        // const { accessToken } = response.data.token;
        console.log(response.data);
        localStorage.setItem("userId", loginData.userId);
        setIsLoggedIn(true);

        // localStorage.setItem("accessToken", accessToken);
        // localStorage.setItem("refreshToken", refreshToken);       
        

        const thirtyMinutes = 30 * 60 * 1000;
        setTimeout(() => {
            // Perform logout logic here
            setIsLoggedIn(false);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }, thirtyMinutes);
    } catch (error) {
        console.error("로그인 실패", error);
    }
  };

  const changeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
      setLoginData((prevData) => ({ ...prevData, [name]: value }));
      console.log(loginData);
      
  };

    return (
        <div className="max-w-7xl my-0 mx-auto mb-[10rem]">
            <div className="loginForm w-screen">
                <form onSubmit={loginRequest}>
                    <input
                        type="text"
                        placeholder="아이디"
                        name="userId"
                        onChange={changeData}
                        className="input input-success w-full max-w-xs block mb-[3rem] mt-[8rem] mx-auto border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500"
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        name="password"
                        onChange={changeData}
                        className="input input-success w-full max-w-xs block mb-[3rem] mx-auto border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500"
                    />
                    <div className="w-screen flex justify-center">
                        <button
                            type="button"
                            className="btn bg-indigo-400 hover:bg-indigo-300 max-w-xs w-full mb-[3rem]"
                            onClick={loginRequest}
                        >
                            로그인
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-screen flex justify-center">
                <div className="mb-[3rem] text-2xl">SNS 로그인</div>
            </div>
            <div className="w-screen flex justify-center">
                <div className="flex justify-center mb-[5rem] min-w-3xl">
                    <img className="w-12 h-12" src={google}></img>
                    <img className="w-12 h-12 mr-[6rem] ml-[6rem]" src={naver}></img>
                    <img className="w-12 h-12 " src={kakao}></img>
                </div>
            </div>
            <div className="w-screen flex justify-center">
                <Link to={"/signUp"}>
                    <button className="btn bg-indigo-400 hover:bg-indigo-300 mr-[1rem]">
                        회원가입
                    </button>
                </Link>
                <Link to={"/findId"}>
                    <button className="btn bg-indigo-400 hover:bg-indigo-300 mr-[1rem]">
                        아이디 찾기
                    </button>
                </Link>
                <Link to={"/findPassword"}>
                    <button className="btn bg-indigo-400 hover:bg-indigo-300">
                        비밀번호 찾기
                    </button>
                </Link>
            </div>
        </div>
    );
}
