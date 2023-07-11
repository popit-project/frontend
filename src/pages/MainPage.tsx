import { Link } from 'react-router-dom';
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
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.625 10V36.25M14.375 3.75003V30M24.4742 9.73753L15.5258 4.01253C15.1698 3.83472 14.7766 3.74445 14.3787 3.7492C13.9809 3.75396 13.5899 3.85361 13.2383 4.03987L4.41484 9.96018C4.21411 10.0665 4.04614 10.2256 3.929 10.4202C3.81186 10.6148 3.74998 10.8377 3.75 11.0649V34.1742C3.74998 34.3898 3.80571 34.6017 3.91178 34.7894C4.01785 34.9771 4.17065 35.1341 4.35534 35.2453C4.54003 35.3565 4.75033 35.418 4.96582 35.4239C5.18131 35.4298 5.39466 35.3799 5.58516 35.2789L13.2273 30.2953C13.5818 30.1075 13.9763 30.0078 14.3774 30.0045C14.7785 30.0013 15.1746 30.0946 15.532 30.2766L24.2711 35.9797C24.6255 36.1603 25.0178 36.2537 25.4155 36.2522C25.8132 36.2507 26.2048 36.1543 26.5578 35.9711L35.5758 30.0383C35.779 29.9329 35.9493 29.7736 36.0682 29.578C36.1871 29.3824 36.25 29.1579 36.25 28.9289V5.82581C36.25 5.61024 36.1943 5.39833 36.0882 5.21066C35.9822 5.02299 35.8294 4.86594 35.6447 4.75476C35.46 4.64358 35.2497 4.58206 35.0342 4.57617C34.8187 4.57027 34.6053 4.62021 34.4148 4.72112L26.7586 9.71018C26.4074 9.89593 26.017 9.9953 25.6197 10.0001C25.2224 10.0048 24.8298 9.91481 24.4742 9.73753Z" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
              <Link to="/popuplist?type=FLEA_MARKET">
                <div className="btn grid h-20 card bg-indigo-900 rounded-box place-items-center text-white hover:bg-indigo-900">
                  <div className="flex items-center justify-center transition-transform hover:scale-105">
                    <p>플리마켓 보러가기</p>
                    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                      <path d="M33.3335 13.3331H13.3335L15.3535 8.28312C15.5224 7.86125 15.6033 7.4093 15.5911 6.95504C15.579 6.50077 15.4741 6.05379 15.2829 5.64155C15.0916 5.22931 14.8182 4.86052 14.4792 4.55785C14.1403 4.25517 13.743 4.02499 13.3118 3.88146L12.7452 3.69312C12.4272 3.5869 12.0846 3.57924 11.7622 3.67114C11.4398 3.76304 11.1527 3.95022 10.9385 4.20812L3.7185 12.8698C3.46955 13.1695 3.33334 13.5469 3.3335 13.9365V31.6665C3.3335 32.5505 3.68469 33.3984 4.30981 34.0235C4.93493 34.6486 5.78277 34.9998 6.66683 34.9998H18.6835C19.5036 34.9995 20.2947 34.6969 20.9057 34.1499C21.5167 33.6029 21.9045 32.8498 21.9952 32.0348L23.3335 19.9998H33.3335C34.2176 19.9998 35.0654 19.6486 35.6905 19.0235C36.3156 18.3984 36.6668 17.5505 36.6668 16.6665C36.6668 15.7824 36.3156 14.9346 35.6905 14.3094C35.0654 13.6843 34.2176 13.3331 33.3335 13.3331Z" fill="white" />
                    </svg>
                  </div>
                </div>
              </Link>
              <div className="divider"></div>
              <Link to="/popuplist?type=POPUP_STORE">
                <div className="btn grid h-20 card bg-indigo-900 rounded-box place-items-center text-white hover:bg-indigo-900">
                  <div className="flex items-center justify-center transition-transform hover:scale-105">
                    <p>팝업스토어 보러가기</p>
                    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                      <path d="M33.3335 13.3331H13.3335L15.3535 8.28312C15.5224 7.86125 15.6033 7.4093 15.5911 6.95504C15.579 6.50077 15.4741 6.05379 15.2829 5.64155C15.0916 5.22931 14.8182 4.86052 14.4792 4.55785C14.1403 4.25517 13.743 4.02499 13.3118 3.88146L12.7452 3.69312C12.4272 3.5869 12.0846 3.57924 11.7622 3.67114C11.4398 3.76304 11.1527 3.95022 10.9385 4.20812L3.7185 12.8698C3.46955 13.1695 3.33334 13.5469 3.3335 13.9365V31.6665C3.3335 32.5505 3.68469 33.3984 4.30981 34.0235C4.93493 34.6486 5.78277 34.9998 6.66683 34.9998H18.6835C19.5036 34.9995 20.2947 34.6969 20.9057 34.1499C21.5167 33.6029 21.9045 32.8498 21.9952 32.0348L23.3335 19.9998H33.3335C34.2176 19.9998 35.0654 19.6486 35.6905 19.0235C36.3156 18.3984 36.6668 17.5505 36.6668 16.6665C36.6668 15.7824 36.3156 14.9346 35.6905 14.3094C35.0654 13.6843 34.2176 13.3331 33.3335 13.3331Z" fill="white" />
                    </svg>
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
