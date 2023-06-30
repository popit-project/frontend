import { CommentIcon, FillLikeIcon, LikeIcon } from "../assets/icons/Icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";
import { useLocation } from "react-router-dom";
import Search from "../components/SearchBar";

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

export default function PopupListPage() {
  const [popupList, setPopupList] = useState<Popup[]>([]);
  const [likedStoreIds, setLikedStoreIds] = useState<number[]>([]);
  const [searchResults, setSearchResults] = useState<Popup[]>([]);

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

  // const handleLiked = (id: number) => {
  //   const popup = popupList.find((popup) => popup.id === id);
  //   if (popup) {
  //     const isLike = !popup.isLike;
  //     const updatedLikes = isLike ? popup.likes + 1 : popup.likes - 1;
  //     axiosInstance
  //       .patch(`/popupList/${id}`, { isLike })
  //       .then(() => {
  //         setPopupList((prevPopupList) =>
  //           prevPopupList.map((item) =>
  //             item.id === id ? { ...item, isLike, likes: updatedLikes } : item
  //           )
  //         );
  //       })
  //       .catch((error) => console.error(error));
  //   }
  // };

  const location = useLocation();
  const searchKeyword = new URLSearchParams(location.search).get("q");

  const getSearchResults = async (searchKeyword: string) => {
    const results = popupList.filter(
      (popup) =>
        popup.storeName.includes(searchKeyword) ||
        popup.storeAddress.includes(searchKeyword)
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
  };

  return (
    <>
      <Search />
      <div className="max-w-7xl flex justify-end my-0 mx-auto">
      <button
        onClick={handleShowAllPopup}
        className="mt-4 bg-gray-200 p-2 px-3 rounded"
      >
        모든 스토어 보기
      </button>
      </div>

      {searchResults.length === 0 ? (
        <div>해당되는 아이템이 없습니다.</div>
      ) : (
        <div className="max-w-7xl my-0 mx-auto mb-[10rem] mt-10 grid grid-cols-1 gap-2 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          {searchResults.map((popup) => (
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
      )}
    </>
  );
}
