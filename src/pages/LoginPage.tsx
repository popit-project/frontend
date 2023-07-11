import React from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { LoginTokenAtom } from "../recoilAtom/LoginTokenAtom";
import Loading from "../components/Loading";

import google from "../assets/images/818cf8.png";

//구글로그인은 -> 버튼클릭하면 api/google호출해서 응답받은걸로(url) navigate를 하면은 그 url로 이동하기 !
//로그아웃 버튼이 있어야하고. 로그아웃을 하면 localStorage에서 로그인 아이디 및 인증토큰들을 다 지워야함.

export default function LoginPage() {
  const [loginData, setLoginData] = useState({ userId: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginTokenAtom);
  const [loading, setLoading] = useState(false);

  const loginRequest = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        "https://pop-it.store/api/user/login",
        loginData
      );

      console.log(response.data);
      setIsLoggedIn(true);
      localStorage.setItem("loginState", "true");
      localStorage.setItem("userId", loginData.userId);
      localStorage.setItem("expiresIn", response.data.expiresIn);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("sellerId", response.data.sellerId);
      localStorage.setItem("nickname", response.data.nickname);

      window.location.href = "/";

      //자동 로그아웃 구현 expiresIn 파싱해서 하는 방법 다시 생각해보기.
      //일단 지금은 만료시간이 로그인 하는 시점 + 30분이라 이렇게 구현.

      setLoading(false);

      const thirtyMinutes = 30 * 60 * 1000;

      setTimeout(() => {
        setIsLoggedIn(false);
        localStorage.removeItem("loginState");
        localStorage.removeItem("userId");
        localStorage.removeItem("expiresIn");
        localStorage.removeItem("token");
        localStorage.removeItem("sellerId");
        localStorage.removeItem("nickname");
      }, thirtyMinutes);
    } catch (error) {
      console.error("로그인 실패", error);
      console.log(isLoggedIn);
    }
  };

  const googleLogin = async () => {
    const response = await axiosInstance.post(
      "https://pop-it.store/api/login/google"
    );
    console.log(response.data);
    window.location.href = `${response.data}`;
  };
  const changeData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setLoginData((prevData) => ({ ...prevData, [name]: value }));
      console.log(loginData);
    },
    [loginData]
  );

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div className="w-full my-0 mx-auto mb-[10rem]">
          <div className="loginForm w-full">
            <form onSubmit={loginRequest}>
              <input
                type="text"
                placeholder="아이디"
                name="userId"
                onChange={changeData}
                className="input input-success w-full max-w-xs block mb-[2.5rem] mt-[1rem] mx-auto border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500"
              />
              <input
                type="password"
                placeholder="비밀번호"
                name="password"
                onChange={changeData}
                className="input input-success w-full max-w-xs block mb-[2.5rem] mx-auto border-indigo-500 hover:border-indigo-500 focus:outline-indigo-500"
              />
              <div className="w-full flex justify-center">
                <button
                  type="button"
                  className="btn bg-indigo-400 hover:bg-indigo-300 max-w-xs w-full mb-[2.5rem]"
                  onClick={loginRequest}
                >
                  로그인
                </button>
              </div>
            </form>
          </div>
          <div className="w-full flex justify-center">
            <div className="mb-[2.5rem] text-2xl">SNS 로그인</div>
          </div>
          <div className="w-full flex justify-center">
            <div className="flex justify-center mb-[3.8rem] min-w-3xl">
              <img
                className="w-30 h-12 bg-indigo-100 border-none hover:bg-indigo-200 rounded-lg hover:cursor-pointer"
                src={google}
                onClick={googleLogin}
              ></img>
            </div>
          </div>
          <div className="w-full flex justify-center">
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
      )}
    </>
  );
}

export const MemoizedLoginPage = React.memo(LoginPage);
