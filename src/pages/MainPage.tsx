import Footer from "../components/Footer";
import RecomList from "../components/RecomList";
import { FiSearch } from 'react-icons/Fi';
import { AiOutlineUser } from 'react-icons/Ai';
import { Link } from "react-router-dom";
import Navbar from "../components/MainNav";


const MainPage = () => {
  return (
    <>
      <div className="max-w-screen-lg my-0 mx-auto">
        <div className="my-0 mx-auto">
        <Navbar />
          <div className="flex">
          <FiSearch />
            <input type="text" placeholder="스토어나 동네를 검색하세요!" className="input input-bordered w-full max-w-xs" />
          </div>
          <div className="card w-96 bg-base-100 shadow-xl image-full w-full">
            <div className="card-body">
              <h2 className="card-title">POPIT!</h2>
              <p>내 주변 팝업 스토어 찾기</p>
              <div className="card-actions justify-end">
                <Link to="/map">
                <button className="btn bg-indigo-500 border-indigo-500 text-white hover:bg-indigo-300 hover:border-indigo-300" >바로가기</button>
                {/* <button className="btn btn-outline border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400" >바로가기</button> */}
                
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col w-full">
              <Link to="popuplist">
              <div className="btn grid h-20 card bg-base-300 rounded-box place-items-center">팝업스토어 보기</div> 
              </Link>
              <div className="divider"></div> 
              <Link to="profile">
              <div className="btn grid h-20 card bg-base-300 rounded-box place-items-center">셀러 등록하러 가기</div>
              </Link>
            </div>
          </div>
          <RecomList />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainPage;