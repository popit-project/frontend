import { useEffect, useState } from "react";
import Home from "../components/Tab/PopupDetail/Home";
import News from "../components/Tab/PopupDetail/News";
import Product from "../components/Tab/PopupDetail/Product";
import Review from "../components/Tab/PopupDetail/Review";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/MainNav";
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

export default function Detail_management() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const [popup, setPopup] = useState<Popup | null>(null);

  const handleTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/popupList");
        const popupList: Popup[] = response.data;
        const selectPopup = popupList.find(
          (popup: Popup) => popup.id === Number(id)
        );
        if (selectPopup) {
          setPopup(selectPopup);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <NavBar />
      <div>
        <figure className="h-60 bg-gray-400">
          <img src="" alt="" />
          <span>팝업이미지</span>
        </figure>
        <div className="flex items-center h-24 m-6">
          <figure className="w-24 h-24 rounded-full bg-gray-400">
            <img src="" alt="" />
            <span></span>
          </figure>
          <div className="ml-8 text-left">
            <p className="font-bold text-xl mb-2">{popup?.name}</p>
            <span>{popup?.address}</span>
          </div>
        </div>
      </div>
      <div>
        <div>
          <ul className="flex items-center justify-around font-semibold text-center">
            <li
              onClick={() => handleTab("tab1")}
              className={`tab1 cursor-pointer grow border-b border-slate-400 py-2.5 ${
                activeTab === "tab1" ? "active" : ""
              }`}
            >
              홈
            </li>
            <li
              onClick={() => handleTab("tab2")}
              className={`tab2 cursor-pointer grow border-b border-slate-400 py-2.5 ${
                activeTab === "tab2" ? "active" : ""
              }`}
            >
              소식
            </li>
            <li
              onClick={() => handleTab("tab3")}
              className={`tab3 cursor-pointer grow border-b border-slate-400 py-2.5 ${
                activeTab === "tab3" ? "active" : ""
              }`}
            >
              상품
            </li>
            <li
              onClick={() => handleTab("tab4")}
              className={`tab4 cursor-pointer grow border-b border-slate-400 py-2.5 ${
                activeTab === "tab4" ? "active" : ""
              }`}
            >
              후기
            </li>
          </ul>
        </div>
        <div>
          {activeTab === "tab1" && <Home popup={popup} />}
          {activeTab === "tab2" && <News />}
          {activeTab === "tab3" && <Product />}
          {activeTab === "tab4" && <Review />}
        </div>
      </div>
    </div>
  );
}
