import { useState } from "react";
// import Home from "./Tab/Home";
// import News from "./Tab/News";
// import Product from "./Tab/Product";
// import Review from "./Tab/Review";

export default function Detail_management() {
  const [activeTab, setActiveTab] = useState<string>("tab1");

  const handleTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="">
      <div>
        <figure className="h-60 bg-gray-400">
          <img src="" alt="" />
          <span>팝업이미지</span>
        </figure>
        <div className="flex items-center h-24 m-6">
          <figure className="w-24 h-24 rounded-full bg-gray-400">
            <img src="" alt="" />
            <span>이미지</span>
          </figure>
          <div className="ml-8 text-left">
            <p className="font-bold text-xl mb-2">부엉이돈까스학동역점</p>
            <span>위치(논현동)</span>
          </div>
        </div>
      </div>
      <div>
        <div>
          <ul className="flex items-center justify-around font-semibold">
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
          {/* {activeTab === "tab1" && <Home />}
          {activeTab === "tab2" && <News />}
          {activeTab === "tab3" && <Product />}
          {activeTab === "tab4" && <Review />} */}
        </div>
      </div>
    </div>
  );
}
