import { CommentIcon, FillLikeIcon, LikeIcon } from "../assets/icons/Icons";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

interface Popup {
  id: number;
  name: string;
  address: string;
  period: string;
  comments: number;
  isLike: boolean;
  likes: number;
}

export default function PopupListPage() {
  const [popupList, setPopupList] = useState<Popup[]>([]);

  const fetchPopups = async () => {
    const { data } = await axios.get("http://localhost:3000/popupList");
    setPopupList(data);
  };

  useEffect(() => {
    fetchPopups();
  }, []);

  const handleLiked = (id: number) => {
    axios
      .post("http://localhost:3000/popupList")
      .then(() => {
        setPopupList((prevPopupList) => {
          return prevPopupList.map((popup) => {
            if (popup.id === id) {
              if (popup.isLike) {
                return { ...popup, isLike: false, likes: popup.likes - 1 };
              } else {
                return { ...popup, isLike: true, likes: popup.likes + 1 };
              }
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
            <Link to={`/${popup.id}`}>
              <figure className="bg-gray-500 h-80">
                <img src="" alt="" />
                <span className="text-slate-800">팝업스토어 사진</span>
              </figure>
              <div className="p-3">
                <div className="mb-3 text-left color text-slate-800">
                  <h3 className="font-bold">{popup.name}</h3>
                  <p>{popup.address}</p>
                  <p>{popup.period}</p>
                </div>
              </div>
            </Link>
            <div>
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
    </>
  );
}
