import { useEffect, useState } from "react";
import Home from "../components/Tab/Seller/Home";
import News from "../components/Tab/Seller/News";
import Product from "../components/Tab/Seller/Product";
import Review from "../components/Tab/Seller/Review";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";
import MainNav from "../components/MainNav";

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
      <MainNav />
      <div>
        <figure className="h-60 bg-gray-400">
          <img src="" alt="" />
          <span>팝업이미지</span>
        </figure>
        <div className="flex items-center h-24 m-6">
          <div className="ml-8 text-left">
            <p className="font-bold text-xl mb-2">{popup?.storeName}</p>
            <span>{popup?.storeAddress}</span>
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
