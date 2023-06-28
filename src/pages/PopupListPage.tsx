import { CommentIcon, FillLikeIcon, LikeIcon } from "../assets/icons/Icons";
import { useEffect, useState } from "react";
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
  id: number;
  likes: number;
  isLike: boolean;
  comments: number;
}

export default function PopupListPage() {
  const [popupList, setPopupList] = useState<Popup[]>([]);

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

  const handleLiked = (id: number) => {
    const popup = popupList.find((popup) => popup.id === id);
    if (popup) {
      const isLike = !popup.isLike;
      const updatedLikes = isLike ? popup.likes + 1 : popup.likes - 1;
      axiosInstance
        .patch(`/popupList/${id}`, { isLike })
        .then(() => {
          setPopupList((prevPopupList) =>
            prevPopupList.map((item) =>
              item.id === id ? { ...item, isLike, likes: updatedLikes } : item
            )
          );
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
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
