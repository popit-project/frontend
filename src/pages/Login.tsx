import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import google from "../icon/google.256x256.png";
import naver from "../icon/naver-line.256x233.png";
import kakao from "../icon/kakaotalk.256x236.png";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";
import { useState } from "react";
import NavBar from "../components/Navbar";

export default function Login() {
  //아래 내비게이트 포함하면 오류나면서 렌더링안됌.
  // const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ userId: "", password: "" });

  const loginRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "http://3.34.149.07:8082/api/user/login",
        loginData
      );

      const { accessToken, refreshToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      // navigate("/main");
    } catch (error) {
      console.error("로그인 실패", error);
    }
  };

  const changeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
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
                        type="text"
                        placeholder="비밀번호"
                        name="password"
                        onChange={changeData}
                        className="input input-bordered input-success w-full max-w-xs block mb-[3rem] mx-auto border-violet-500 hover:border-violet-500 focus:outline-violet-500"
                    />
                    <div className="w-screen flex justify-center">
                        <button
                            type="button"
                            className="btn bg-violet-400 hover:bg-violet-300 max-w-xs w-full mb-[3rem]"
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
                <button className="btn bg-violet-400 hover:bg-violet-300">
                    비밀번호 찾기
                </button>
            </div>
        </>
    );
}
