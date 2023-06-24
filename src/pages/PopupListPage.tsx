import { CommentIcon, FillLikeIcon, LikeIcon } from "../assets/icons/Icons";
import { useEffect, useState } from "react";
import Navbar from "../components/MainNav";
import { Link } from "react-router-dom";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";

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
  // 이 아래는 각각 api 알아봐야함. 즉, 없어지거나 수정예정
  likes: number;
  isLike: boolean;
  comments: number;
}

export default function PopupListPage() {
  const [popupList, setPopupList] = useState<Popup[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/popupList")
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
              const updatedLikes = popup.isLike
                ? popup.likes - 1
                : popup.likes + 1;
              return { ...popup, isLike: !popup.isLike, likes: updatedLikes };
            }
            return popup;
          });
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        {popupList.map((popup) => (
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
            <div>
              <div className="flex items-center justify-end">
                <div className="flex items-center">
                  <CommentIcon width={30} height={30} fill="#a5b4fc" />
                  {popup.comments}
                </div>
                <div className="flex items-center ml-2">
                  {popup.isLike ? (
                    <span onClick={() => handleLiked(popup.id)}>
                      <FillLikeIcon width={30} height={30} fill="#a5b4fc" />
                    </span>
                  ) : (
                    <span onClick={() => handleLiked(popup.id)}>
                      <LikeIcon width={30} height={30} fill="#a5b4fc" />
                    </span>
                  )}
                  {popup.likes}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
