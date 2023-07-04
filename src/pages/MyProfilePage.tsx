import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { LoginTokenAtom } from "../recoilAtom/LoginTokenAtom";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";

interface UserInfo {
  email: string,
  nickname: string
  phone: string
  userId: string
  sellerModeButton: string
}

const MyProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginTokenAtom);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [newNickname, setNewNickname] = useState("");
  const [tmp, setTmp] = useState();

  const currentUserId = localStorage.getItem("userId");

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("loginState");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("token");
    localStorage.removeItem("recoil-persist");
    localStorage.removeItem("likedStoreIds");

    window.location.href = "/";
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get("http://3.34.149.107:8082/api/user/info", {
          params: {
            userId: currentUserId,
          },
        });
        const data = response.data;
        setUserInfo(data);
        // console.log(userInfo)
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get("http://3.34.149.107:8082/api/seller/storeHome", {
          params: {
            userId: currentUserId,
          },
        });
        const data = response.data;
        // setUserInfo(data);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);
  

  // const storeInfo = async () => {
  //   const storeInfoData = await axiosInstance.get(
  //       `http://3.34.149.107:8082/api/seller/${localStorage.getItem(
  //           "userId"
  //       )}/storeHome`,
  //       {
  //           headers: {
  //               Authorization: `Bearer ${localStorage.getItem(
  //                   "token"
  //               )}`,
  //           },
  //       }
  //   );

  //   const Ctmp = storeInfoData.data;

  //   console.log(Ctmp);
  //   setTmp(storeInfoData.data)

  //   }
  //   console.log(tmp)
  //   storeInfo()

  useEffect(() => {    

      const fetchData = async () => {
        const userId = localStorage.getItem("sellerId");
        try {
          const response = await axiosInstance.get(
            `http://3.34.149.107:8082/api/seller/${userId}/storeHome`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          localStorage.setItem("sellerId", response.data.sellerId);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, []);

  const saveNickname = async () => {
    try {
      const response = await axiosInstance.post(
        "http://3.34.149.107:8082/api/user/changeUserInfo",
        {
          email: userInfo?.email,
          newNickname: newNickname
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setIsEditing(false);
        setUserInfo((prevUserInfo: UserInfo | null) => {
          if (prevUserInfo) {
            return {
              ...prevUserInfo,
              nickname: newNickname,
            };
          }
          return null;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderSellerButton = () => {
    if (userInfo?.sellerModeButton === "BUTTON_DISPLAY_ON") {
      return (
        <>
          <Link to="/sellerRegisPage">
            <div>
              <p className="btn btn-outline mb-5 border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400" >스토어 정보 수정</p>
            </div>
          </Link>
          {/* <Link to={`/popuplist/${tmp}`}> */}
          <Link to={"/seller"}>
            <div>
              <p className="btn btn-outline mb-5 border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400" >My 스토어 가기</p>
            </div>
          </Link>
        </>
      )
    } else {
      return (
        <Link to="/sellerRegisPage">
          <div>
            <p className="btn btn-outline mb-5 border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400" >셀러 등록</p>
          </div>
        </Link>
      )
    }
  };

  return (
    <div className="max-w-screen-lg my-0 mx-auto">
      <div className="w-4/5 my-0 mx-auto pt-12 pb-10">
        <div className="pt-5">
          <p className="font-bold text-2xl py-2">내정보</p>
        </div>
        <div>
          <div className="py-3 pt-10 relative border-b pb-10">
            {isEditing ?
              <div className="flex items-center">
                <p className="inline-block w-20">닉네임</p>
                <input
                  type="text"
                  placeholder={userInfo?.nickname}
                  className={`w-72 h-12 bg-indigo-50 flex items-center pl-5 pb-1 rounded-lg`}
                  disabled={!isEditing}
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                />
              </div>
              :
              <div className="flex">
                <p className="inline-block w-20 flex items-center">닉네임</p>
                <div className="w-72 h-12 bg-indigo-50 flex items-center pl-5 pb-1 rounded-lg">
                  {userInfo?.nickname}
                </div>
              </div>}
            <p
              className="btn absolute right-0 top-10 p-2 bg-indigo-400 border-indigo-400 text-white hover:bg-indigo-300 hover:border-indigo-300"
              onClick={isEditing ? saveNickname : handleEditClick}
            >
              {isEditing ? "저장하기" : "수정하기"}
            </p>
          </div>

          <div className="py-3 pt-10 flex">
            <p className="inline-block w-20 flex items-center">아이디</p>
            <div className="w-72 h-12 bg-indigo-50 flex items-center pl-5 pb-1 rounded-lg">
              {userInfo?.userId}
            </div>
          </div>
          <div className="py-3 pt-10 flex">
            <p className="inline-block w-20 flex items-center">이메일</p>
            <div className="w-72 h-12 bg-indigo-50 flex items-center pl-5 pb-1 rounded-lg">
              {userInfo?.email}
            </div>
          </div>
          <div className="py-3 pt-10 flex pb-16">
            <p className="inline-block w-20 flex items-center">전화번호</p>
            <div className="w-72 h-12 bg-indigo-50 flex items-center pl-5 pb-1 rounded-lg">
              {userInfo?.phone}
            </div>
          </div>
        </div>
        {renderSellerButton()}
        <div className="flex justify-center mt-16">
          <p className="btn btn-outline w-4/5 mb-5 border-indigo-400 text-white bg-indigo-400 hover:bg-indigo-500 hover:border-indigo-500" onClick={logOut}>로그아웃</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
