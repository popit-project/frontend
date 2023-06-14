import { Link } from "react-router-dom";
import { CommentIcon, FillLikeIcon, LikeIcon } from "../assets/icons/Icons";
import { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        hello
        {popupList.map((popup) => (
          <div key={popup.id}>
            <Link to={`/popupList/${popup.id}`}>
              <figure className="bg-gray-500 h-80">
                <img src="" alt="" />
                <span>팝업스토어 사진</span>
              </figure>
              <div className="p-3">
                <div className="mb-3">
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
                {popup.isLike ? (
                  <div
                    className="flex items-center"
                    // onClick={() => handleLike(popup.id)}
                  >
                    <FillLikeIcon width={30} height={30} fill="#F24E1E" />
                    {popup.likes}
                  </div>
                ) : (
                  <div
                    className="flex items-center"
                    // onClick={() => handleLike(popup.id)}
                  >
                    <LikeIcon width={30} height={30} fill="#F24E1E" />
                    {popup.likes}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
