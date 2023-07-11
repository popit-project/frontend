import { useEffect, useState } from "react";
import Home from "../components/Tab/Seller/Home";
import News from "../components/Tab/Seller/News";
import Product from "../components/Tab/Seller/Product";
import Review from "../components/Tab/Seller/Review";
import { axiosInstance } from "../components/AxiosInstance/AxiosConfig";

interface Popup {
  closeDate: string;
  closeTime: string;
  openDate: string;
  openTime: string;
  sellerId: number;
  storeAddress: string;
  storeId: number;
  storeImage: string;
  storeName: string;
  storeType: string;
}

export default function SellerManagementPage() {
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const [popup, setPopup] = useState<Popup | null>(null);

  const handleTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const fetchData = async () => {
      const sellerId = localStorage.getItem("sellerId");
      try {
        const response = await axiosInstance.get(
          `https://pop-it.store/api/seller/${sellerId}/storeHome`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        setPopup(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <figure className="h-60 bg-indigo-200 overflow-hidden relative">
          <img
            src={popup?.storeImage}
            alt=""
            className="w-full absolute top-[30%] -translate-y-[50%] opacity-70"
          />
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
          {activeTab === "tab2" && popup?.storeName && (
            <News storeName={popup.storeName} />
          )}
          {activeTab === "tab3" && popup?.storeName && (
            <Product storeId={popup.storeId} />
          )}
          {activeTab === "tab4" && popup?.storeName && (
            <Review storeId={popup.storeId} />
          )}
        </div>
      </div>
    </div>
  );
}
