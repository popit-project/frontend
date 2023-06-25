import { redirect } from "react-router-dom";
import Nav from "../components/Nav";
import google from "../icon/google.256x256.png";
import naver from "../icon/naver-line.256x233.png";
import kakao from "../icon/kakaotalk.256x236.png";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";
import { useState } from "react";
import NavBar from "../components/Navbar";

//구글로그인은 -> 버튼클릭하면 api/google호출해서 응답받은걸로(url) navigate를 하면은 그 url로 이동하기 !
//로그아웃 버튼이 있어야하고. 로그아웃을 하면 localStorage에서 로그인 아이디 및 인증토큰들을 다 지워야함.

export default function Login() {
  const [loginData, setLoginData] = useState({ userId: "", password: "" });
  const loginRequest = async () => { 

    try {
        const response = await axiosInstance.post(
            "http://3.34.149.107:8082/api/user/login", loginData
            
        );

        // const { accessToken } = response.data.token;
        console.log(response.data);
        localStorage.setItem("userId", loginData.userId);

        // localStorage.setItem("accessToken", accessToken);
        // localStorage.setItem("refreshToken", refreshToken);
        
        // navigate("/main");
        
        const thirtyMinutes = 30 * 60 * 1000;
        setTimeout(() => {
            // Perform logout logic here
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            // navigate("/login"); // Uncomment this line if you want to navigate to the login page after logout
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
        <>
            <Nav />
            <div className="loginForm w-screen">
                <form onSubmit={loginRequest}>
                    <input
                        type="text"
                        placeholder="아이디"
                        name="userId"
                        onChange={changeData}
                        className="input input-bordered input-success w-full max-w-xs block mb-[3rem] mt-[8rem] mx-auto border-violet-500 hover:border-violet-500 focus:outline-violet-500"
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        name="password"
                        onChange={changeData}
                        className="input input-bordered input-success w-full max-w-xs block mb-[3rem] mx-auto border-violet-500 hover:border-violet-500 focus:outline-violet-500"
                    />
                    <div className="w-screen flex justify-center">
                        <button
                            type="button"
                            className="btn bg-violet-400 hover:bg-violet-300 max-w-xs w-full mb-[3rem]"
                            onClick={loginRequest}
                        >
                            로그인
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-screen flex justify-center">
                <div className="mb-[2rem]">SNS로 로그인하기</div>
            </div>
            <div className="connect w-screen flex justify-center mb-[3rem]">
                <img className="w-8 h-8 mx-auto" src={google}></img>
                <img className="w-8 h-8 mx-auto" src={naver}></img>
                <img className="w-8 h-8 mx-auto" src={kakao}></img>
            </div>
            <div className="w-screen flex justify-center">
                <button className="btn bg-violet-400 hover:bg-violet-300 mr-[1rem]">
                    회원가입
                </button>
                <button className="btn bg-violet-400 hover:bg-violet-300 mr-[1rem]">
                    아이디 찾기
                </button>
                <button className="btn bg-violet-400 hover:bg-violet-300">
                    비밀번호 찾기
                </button>
            </div>
        </>
    );
}
