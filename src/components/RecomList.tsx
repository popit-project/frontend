import { useEffect, useState } from "react";
import axios from "axios";
import { CommentIcon, FillLikeIcon, LikeIcon } from "../assets/icons/Icons";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";

interface Popup {
  id: number;
  name: string;
  address: string;
  period: string;
  comments: number;
  isLike: boolean;
  likes: number;
}


const RecomList = () => {

  const [popupList, setPopupList] = useState<Popup[]>([]);

  const fetchPopups = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/popupList");
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
    <div>
      <p>내 주변 인기 스토어</p>
      <div>
      {popupList.slice(0, 5).map((popup) => (
          <div key={popup.id} className="flex p-2">
            <figure className="bg-gray-500 h-44 w-44">
              <img src="" alt="" />
              <span>팝업스토어 사진</span>
            </figure>
            <div className="ml-7">
              <div className="mb-3 text-left">
                <h3 className="font-bold">{popup.name}</h3>
                <span className="m-1 text-red-500">영업중</span>
                <p>{popup.address}</p>
                <p>{popup.period}</p>
              </div>
            </div>
            <div className="mt-32 ml-10">
              <div className="flex items-center justify-end">
                <div className="flex items-center">
                  <CommentIcon width={30} height={30} fill={"orange"} />
                  {popup.comments}
                </div>
                <div className="flex items-center">
                  {popup.isLike ? (
                    <span onClick={() => handleLiked(popup.id)}>
                      <FillLikeIcon width={30} height={30} fill="#F24E1E" />
                    </span>
                  ) : (
                    <span onClick={() => handleLiked(popup.id)}>
                      <LikeIcon width={30} height={30} fill="#F24E1E" />
                    </span>
                  )}
                  {popup.likes}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  )
}

export default RecomList