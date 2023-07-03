import { useEffect, useState } from "react";
import Home from "../components/Tab/User/Home";
import News from "../components/Tab/User/News";
import Product from "../components/Tab/User/Product";
import Review from "../components/Tab/User/Review";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";
import loopy from "../assets/images/KakaoTalk_Photo_2023-06-23-22-43-57 004.jpeg";

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
  storeImage: string;
  id: number;
  likes: number;
  isLike: boolean;
  comments: number;
}

export default function PopupDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const [popup, setPopup] = useState<Popup | null>(null);

  const handleTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "http://3.34.149.107:8082/api/store/searchAll"
        );
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
    <div className="mb-[10rem]">
      <div>
        <figure className="h-40 sm:h-60 bg-white overflow-hidden relative">
          <img
            src={popup?.storeImage}
            alt={""}
            className="w-full h-full absolute sm:top-[30%] sm:-translate-y-[50%] sm:h-auto opacity-70"
          />
        </figure>
        <div className="max-w-7xl mx-auto">
          <div className="pl-5 flex items-center h-24 my-6">
            <div className="text-left">
              <p className="font-bold text-xl mb-2">{popup?.storeName}</p>
              <span>{popup?.storeAddress}</span>
            </div>
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
          {activeTab === "tab2" && popup?.storeName && (
            <News storeName={popup.storeName} />
          )}
          {activeTab === "tab3" && popup?.id && <Product storeId={popup.id} />}
          {activeTab === "tab4" && <Review />}
        </div>
      </div>
    </div>
  );
}
