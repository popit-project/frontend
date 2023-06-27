import { useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/MainNav";

const MyProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-screen-lg my-0 mx-auto">
      <div className="w-4/5 my-0 mx-auto pt-12 pb-10">
        <div className="pt-5">
          <p className="font-bold text-2xl py-2">내정보</p>
        </div>
        <div>
          <div className="py-3 pt-10 relative border-b pb-10">
            <div>
              <p className="inline-block w-20 mb-2">닉네임{" "}</p>
              <input
                type="text"
                placeholder="Type here"
                className={`input w-full max-w-xs ${
                  isEditing ? "" : "input-disabled"
                }`}
                disabled={!isEditing}
              />
            </div>
            <p 
            className="btn absolute right-0 top-10 p-2 bg-indigo-400 border-indigo-400 text-white hover:bg-indigo-300 hover:border-indigo-300" 
            onClick={handleEditClick}
            >
            {isEditing ? "저장하기" : "수정하기"}
            </p>
          </div>
          <div className="py-3 pt-10">
          <p className="inline-block w-20 mb-2">아이디{" "}</p>
            <input
              type="text"
              placeholder="Type here"
              className="input w-full max-w-xs input-disabled"
            />
          </div>
          <div className="py-3">
          <p className="inline-block w-20 mb-2">이메일{" "}</p>
            <input
              type="text"
              placeholder="Type here"
              className="input w-full max-w-xs input-disabled"
            />
          </div>
          <div className="py-3 pb-10">
          <p className="inline-block w-20 mb-2">전화번호{" "}</p>
            <input
              type="text"
              placeholder="Type here"
              className="input w-full max-w-xs input-disabled"
            />
          </div>
        </div>
        <div>
          {/* <div className="btn mb-5">카트로 가기</div> */}
          <p className="btn btn-outline mb-5 border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400" >카트로 가기</p>
        </div>
        <div>
          {/* <div className="btn mb-5">셀러 등록하기</div> */}
          <p className="btn btn-outline mb-5 border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400" >셀러 등록하기</p>
        </div>
        <div className="flex justify-center mt-20">
          <p className="btn btn-outline w-4/5 mb-5 border-indigo-400 text-white bg-indigo-400 hover:bg-indigo-500 hover:border-indigo-500" >로그아웃</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
