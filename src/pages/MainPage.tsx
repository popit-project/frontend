import { BsMap } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { LiaHandPointRight } from 'react-icons/lia';
import CarouselComponent from '../components/Carousel';
import RecomList from '../components/RecomList';
import SearchBar from '../components/SearchBar';

const MainPage = () => {
  return (
    <>
      <div className="max-w-screen-lg my-0 mx-auto">
        <div className="my-0 mx-auto">
          <SearchBar />
          <CarouselComponent />
          <div className="card w-96 bg-indigo-200 shadow-xl w-full mt-8 mb-8">
            <div className="card-body">
              <BsMap size={38} />
              <h2 className="card-title">POPIT!</h2>
              <p>내 주변 팝업 스토어 찾기</p>
              <div className="card-actions justify-end">
                <Link to="/map">
                  <button className="btn bg-indigo-500 border-indigo-500 text-white hover:bg-indigo-400 hover:border-indigo-400">
                    지도 바로가기
                  </button>
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
                    <LiaHandPointRight size={22} className="ml-2" />
                  </div>
                </div>
              </Link>
              <div className="divider"></div>
              <Link to="/cart">
                <div className="btn grid h-20 card bg-indigo-900 rounded-box place-items-center text-white hover:bg-indigo-900">
                  <div className="flex items-center justify-center transition-transform hover:scale-105">
                    <p>팝업스토어 보러가기</p>
                    <LiaHandPointRight size={22} className="ml-2" />
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
