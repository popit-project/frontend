import { useEffect, useState } from "react";
import axios from "axios";
import { CommentIcon, FillLikeIcon, LikeIcon } from "../assets/icons/Icons";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";
import { AiOutlineRight } from 'react-icons/Ai';

interface Popup {
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
  id: 1;
  likes: number;
  isLike: boolean;
  comments: number;
}

const RecomList = () => {
  const [popupList, setPopupList] = useState<Popup[]>([]);

  const fetchPopups = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/mylocation");
      setPopupList(data);
    } catch (error) {
      console.error("Error fetching popups:", error);
    }
  };

  useEffect(() => {
    fetchPopups();
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/mylocation")
      .then((response) => {
        const data = response.data;
        setPopupList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLiked = (id: number) => {
    axiosInstance
      .patch(`/popupList/${id}`, { isLike: true })
      .then(() => {
        setPopupList((prevPopupList) => {
          return prevPopupList.map((popup) => {
            if (popup.id === id) {
              const updatedLikes = popup.isLike ? popup.likes - 1 : popup.likes + 1;
              return { ...popup, isLike: !popup.isLike, likes: updatedLikes };
            }
            return popup;
          });
        });
      })
      .catch((error) => console.error(error));
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
          <div key={popup.id} className="flex p-2 border-b">
            <figure className="flex-none bg-gray-500 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 2xl:w-44 2xl:h-44 rounded-md overflow-hidden">
              <img src="" alt="" className="object-cover w-full h-full" />
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
                <span className="ml-1 text-sm">{popup.comments}</span>
              </div>
              <div className="flex items-center text-indigo-500">
                {popup.isLike ? (
                  <span onClick={() => handleLiked(popup.id)}>
                    <FillLikeIcon width={24} height={24} fill="#a5b4fc" />
                  </span>
                ) : (
                  <span onClick={() => handleLiked(popup.id)}>
                    <LikeIcon width={24} height={24} fill="#a5b4fc" />
                  </span>
                )}
                <span className="ml-1 text-sm">{popup.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecomList;
