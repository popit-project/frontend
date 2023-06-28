import Footer from "../components/Footer";
import RecomList from "../components/RecomList";
import { FiSearch } from 'react-icons/Fi';
import { LiaHandPointRight } from 'react-icons/lia';
import { BsMap } from 'react-icons/bs';
import { Link } from "react-router-dom";
import Navbar from "../components/MainNav";
import CarouselComponent from "../components/Carousel";
import { useState } from "react";


const MainPage = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchValue);
  };

  return (
    <>
      <div className="max-w-screen-lg my-0 mx-auto">
        <div className="my-0 mx-auto">
          <div className="flex justify-center mt-5 mb-1">
            <div className="items-center justify-center flex m-2" onClick={handleSearch}>
              <FiSearch size="28" color="#a5b4fc" />
            </div>
            <input
              type="text"
              placeholder="스토어나 동네를 검색하세요!"
              className="px-4 py-2 w-64 md:w-80 lg:w-96 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-300"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <CarouselComponent />
          {/* <div className="card w-96 bg-indigo-200 shadow-xl image-full w-full"> */}
          <div className="card w-96 bg-indigo-200 shadow-xl w-full mt-8 mb-8">
            <div className="card-body">
            <BsMap size={38}/>
              <h2 className="card-title">POPIT!</h2>
              <p>내 주변 팝업 스토어 찾기</p>
              <div className="card-actions justify-end">
                <Link to="/map">
                <button className="btn bg-indigo-500 border-indigo-500 text-white hover:bg-indigo-400 hover:border-indigo-400">지도 바로가기</button>
                {/* <button className="btn btn-outline border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400" >바로가기</button> */}
                
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col w-full">
              <Link to="/profile">
              <div className="btn grid h-20 card bg-indigo-900 rounded-box place-items-center text-white hover:bg-indigo-900">
                <div className="flex items-center justify-center transition-transform hover:scale-105">
                <p>플리마켓 보러가기</p>
                <LiaHandPointRight size={22} className="ml-2"/>
                </div>
              </div> 
              </Link>
              <div className="divider"></div> 
              <Link to="/cart">
              <div className="btn grid h-20 card bg-indigo-900 rounded-box place-items-center text-white hover:bg-indigo-900">
                <div className="flex items-center justify-center transition-transform hover:scale-105">
                <p>팝업스토어 보러가기</p>
                <LiaHandPointRight size={22} className="ml-2"/>
                </div>
              </div> 
              </Link>
            </div>
          </div>
          <RecomList />
        </div>
      </div>
    </>
  );
};

export default MainPage;