import Footer from "../components/Footer";
import RecomList from "../components/RecomList";
import { FiSearch } from 'react-icons/Fi';
import { AiOutlineUser } from 'react-icons/Ai';
import { Link } from "react-router-dom";


const MainPage = () => {
  return (
    <div className="w-4/5 my-0 mx-auto">
      <div className="navbar bg-base-100 border-b">
        <div className="navbar-start">
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
          <FiSearch />
          <AiOutlineUser size="20"/>
        </div>
        {/* <div className="navbar-end">
          <a className="btn">Button</a>
        </div> */}
      </div>
      <div className="">
        <input type="text" placeholder="스토어나 동네를 검색하세요!" className="input input-bordered w-full max-w-xs" />
      </div>
      <div className="card w-96 bg-base-100 shadow-xl image-full w-full">
        {/* <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}
        <div className="card-body">
          <h2 className="card-title">POPIT!</h2>
          <p>내 주변 팝업 스토어 찾기</p>
          <div className="card-actions justify-end">
            <Link to="/map">
            <button className="btn btn-primary">바로가기</button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col w-full">
          <div className="btn grid h-20 card bg-base-300 rounded-box place-items-center">팝업스토어 보기</div> 
          <div className="divider"></div> 
          <div className="btn grid h-20 card bg-base-300 rounded-box place-items-center">셀러 등록하러 가기</div>
        </div>
      </div>

      <RecomList />

      <Footer />
    </div>
  );
};

export default MainPage;