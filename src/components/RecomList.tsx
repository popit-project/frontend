import { useEffect, useState } from "react";
import axios from "axios";
import { CommentIcon, FillLikeIcon, LikeIcon } from "../assets/icons/Icons";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";
import { AiOutlineRight } from 'react-icons/Ai';
import { Link } from "react-router-dom";
import { Popup } from "../pages/PopupListPage";

const RecomList = () => {
  const [popupList, setPopupList] = useState<Popup[]>([]);
  const storedLat = localStorage.getItem("lat");
  const storedLng = localStorage.getItem("lng");
  const [likedStoreIds, setLikedStoreIds] = useState<number[]>([]);

  const fetchPopups = async (lat: number, lng: number) => {
    try {
      const { data } = await axios.get(`http://3.34.149.107:8082/api/store/searchAll/5km?userLat=${lng}&userLon=${lat}`);
      setPopupList(data);
    } catch (error) {
      console.error("Error fetching popups:", error);
    }
  };

  useEffect(() => {
    if (storedLat && storedLng) {
      const lat = parseFloat(storedLat);
      const lng = parseFloat(storedLng);
      fetchPopups(lat, lng);
    }
  }, []);

  const handleLiked = (id: number) => {
    axiosInstance
      .post(`http://3.34.149.107:8082/api/store/${id}/toggle-like`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        const updatedLikedStoreIds = likedStoreIds.includes(id)
          ? likedStoreIds.filter((storeId) => storeId !== id)
          : [...likedStoreIds, id];
        localStorage.setItem(
          "likedStoreIds",
          JSON.stringify(updatedLikedStoreIds)
        );
        setLikedStoreIds(updatedLikedStoreIds);
        setPopupList((prevPopupList) => {
          return prevPopupList.map((popup) => {
            if (popup.id === id) {
              return {
                ...popup,
                likeCount: likedStoreIds.includes(id)
                  ? popup.likeCount - 1
                  : popup.likeCount + 1,
              };
            }
            return popup;
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (popupList.length === 0) {
    return (
      <div className="pt-16 pb-16">
        <p className="pb-5 pl-2 font-bold text-xl flex items-center">내 주변 팝업 스토어 <AiOutlineRight /></p>
        <div className="pt-10 pb-5 pl-2 font-bold text-xl text-stone-400">내 주변 팝업 스토어를 찾아보세요!</div>
      </div>
    )
  }

  return (
    <div className="pt-16 pb-16">
        <p className="pb-10 pl-2 font-bold text-xl flex items-center">내 주변 팝업 스토어 <AiOutlineRight /></p>
      <div>
        {popupList.map((popup) => (
          <Link to={`/popuplist/${popup.id}`} key={popup.id}>
          <div key={popup.id} className="flex p-2 border-b">
            <figure className="flex-none bg-gray-500 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 2xl:w-44 2xl:h-44 rounded-md overflow-hidden">
              <img src={popup.storeImage} alt="스토어 이미지" className="object-cover w-full h-full" />
            </figure>
            <div className="ml-4 sm:ml-6">
              <div className="text-left">
                <h3 className="font-bold text-lg sm:text-xl md:text-xl">{popup.storeName}</h3>
                <p className="my-2 text-sm text-gray-500">{popup.storeAddress}</p>
                <p className="text-sm text-gray-500">{popup.openDate} ~ {popup.closeDate}</p>
              </div>
            </div>
            <div className="mt-20 ml-auto flex items-center">
              <div className="flex items-center text-indigo-500 mr-4">
                <CommentIcon width={24} height={24} fill="#a5b4fc" />
                <span className="ml-1 text-sm">{popup.reviewCount}</span>
              </div>
              <div className="flex items-center text-indigo-500">
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecomList;
