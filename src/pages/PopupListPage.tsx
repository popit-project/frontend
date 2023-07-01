import { CommentIcon, FillLikeIcon, LikeIcon } from "../assets/icons/Icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";
import { useLocation } from "react-router-dom";
import Search from "../components/SearchBar";
import Pagination from "../components/Pagination";

export interface Popup {
  storeAddress: string;
  y: number;
  storeName: string;
  x: number;
  storePhone: string;
  openDate: string;
  openTime: string;
  closeTime: string;
  closeDate: string;
  storeType: string;
  id: number;
  reviewCount: number;
  likeCount: number;
}

const PopupListPage: React.FC = () => {
  const [popupList, setPopupList] = useState<Popup[]>([]);
  const [likedStoreIds, setLikedStoreIds] = useState<number[]>([]);
  const [searchResults, setSearchResults] = useState<Popup[]>([]);
  const [selectedStoreType, setSelectedStoreType] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const storeTypeParam = searchParams.get("type");

  useEffect(() => {
    axiosInstance
      .get("http://3.34.149.107:8082/api/store/searchAll")
      .then((response) => {
        const data = response.data;
        setPopupList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchKeyword = new URLSearchParams(location.search).get("q");

  const getSearchResults = (searchKeyword: string) => {
    const results = popupList.filter(
      (popup) =>
        popup.storeName.includes(searchKeyword) || popup.storeAddress.includes(searchKeyword)
    );
    setSearchResults(results);
  };

  useEffect(() => {
    if (searchKeyword) {
      getSearchResults(searchKeyword);
    } else {
      setSearchResults(popupList);
    }
  }, [searchKeyword, popupList]);

  const handleShowAllPopup = () => {
    setSearchResults(popupList);
    setSelectedStoreType(null);
  };

  useEffect(() => {
    if (storeTypeParam) {
      const filteredResults = popupList.filter((popup) => popup.storeType === storeTypeParam);
      setSearchResults(filteredResults);
      setSelectedStoreType(storeTypeParam);
    } else {
      setSearchResults(popupList);
      setSelectedStoreType(null);
    }
  }, [storeTypeParam, popupList]);

  const handleShowPopupByType = (storeType: string) => {
    const filteredResults = popupList.filter((popup) => popup.storeType === storeType);
    setSearchResults(filteredResults);
    setSelectedStoreType(storeType);
    setCurrentPage(1); 
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Search />
      <div className="max-w-7xl flex justify-center my-0 mx-auto">
        <div className="border-r-2 mt-4 border-indigo-200 h-10">
          <button
            onClick={handleShowAllPopup}
            className="mr-1 p-2 px-3 hover:bg-indigo-50 hover:rounded-xl"
          >
            모든 스토어
          </button>
        </div>
        <div className="border-r-2 mt-4 border-indigo-200 h-10">
          <button
            onClick={() => handleShowPopupByType("POPUP_STORE")}
            className="mx-1 p-2 px-3 hover:bg-indigo-50 hover:rounded-xl"
          >
            팝업스토어
          </button>
        </div>
        <div className="mt-4 h-10">
          <button
            onClick={() => handleShowPopupByType("FLEA_MARKET")}
            className="ml-1 p-2 px-3 hover:bg-indigo-50 hover:rounded-xl"
          >
            플리마켓
          </button>
        </div>
      </div>

      {searchResults.length === 0 ? (
        <div>해당되는 아이템이 없습니다.</div>
      ) : (
        <>
          <div className="max-w-7xl my-0 mx-auto mb-[10rem] mt-10 grid grid-cols-1 gap-2 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            {currentItems.map((popup) => (
              <div key={popup.id}>
                <Link to={`/popuplist/${popup.id}`}>
                  <figure className="bg-gray-500 h-80">
                    <img src="" alt="" />
                    <span className="text-slate-800">팝업스토어 사진</span>
                  </figure>
                  <div className="p-3">
                    <div className="mb-3 text-left color text-slate-800">
                      <h3 className="font-bold">{popup.storeName}</h3>
                      <p>{popup.storeAddress}</p>
                      <p>
                        {popup.openDate} ~ {popup.closeDate}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="pl-3">
                  <div className="flex items-center justify-end">
                    <div className="flex items-center">
                      <CommentIcon width={30} height={30} fill="#a5b4fc" />
                      {popup.reviewCount}
                    </div>
                    <div className="flex items-center ml-2">
                      {likedStoreIds.includes(popup.id) ? (
                        <span onClick={() => handleLiked(popup.id)}>
                          <FillLikeIcon width={30} height={30} fill="#A5B4FC" />
                        </span>
                      ) : (
                        <span onClick={() => handleLiked(popup.id)}>
                          <LikeIcon width={30} height={30} fill="#A5B4FC" />
                        </span>
                      )}
                      {popup.likeCount}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        </>
      )}
    </>
  );
};

export default PopupListPage;
