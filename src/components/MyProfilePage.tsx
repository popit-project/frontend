import { useState } from "react";
import Footer from "./Footer";

const MyProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="w-4/5 my-0 mx-auto">
      <div className="navbar bg-base-100 border-b">
        <div>
          <div className="dropdown z-50">
            <label tabIndex={0} className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Item 1</a></li>
              <li>
                <a>Item 2</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">POPIT</a>
        </div>
      </div>
      <div className="w-4/5 my-0 mx-auto pt-12 pb-20">
        <div className="pt-5">
          <p className="font-bold text-2xl py-2">내정보</p>
        </div>
        <div>
          <div className="py-3 pt-10 relative">
            <div>
              <p className="inline-block w-20">닉네임{" "}</p>
              <input
                type="text"
                placeholder="Type here"
                className={`input w-full max-w-xs ${
                  isEditing ? "" : "input-disabled"
                }`}
                disabled={!isEditing}
              />
            </div>
            <p className="btn absolute right-0 top-10 p-2" onClick={handleEditClick}>
            {isEditing ? "저장하기" : "수정하기"}
            </p>
          </div>
          <div className="py-3">
          <p className="inline-block w-20">이메일{" "}</p>
            <input
              type="text"
              placeholder="Type here"
              className="input w-full max-w-xs input-disabled"
            />
          </div>
          <div className="py-3 pb-10">
          <p className="inline-block w-20">전화번호{" "}</p>
            <input
              type="text"
              placeholder="Type here"
              className="input w-full max-w-xs input-disabled"
            />
          </div>
        </div>
        <div>
          <div className="btn mb-5">카트로 가기</div>
        </div>
        <div>
          <div className="btn mb-5">셀러 등록하기</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyProfilePage;
