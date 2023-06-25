import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Review from "./pages/Review";
import MainPage from "./pages/MainPage";
import SellerRegis from "./pages/SellerRegis";
import ProductRegis from "./pages/ProductRegis";
import { RecoilRoot } from "recoil";
import MapPage from "./pages/MapPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FindId from "./pages/FindId";
import PopupDetail from "./pages/PopupDetail";
import FindPassword from "./pages/FindPassword";
import PopupListPage from "./pages/PopupListPage";
import MyProfilePage from "./components/MyProfilePage";
import Cart from "./pages/Cart";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<MainPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/popuplist" element={<PopupListPage />} />
              <Route path="/popuplist/:id" element={<PopupDetail />} />
              <Route path="/seller" element={<PopupDetail />} />
              <Route path="/profile" element={<MyProfilePage />} />
              <Route path="/cart" element={<Cart />} />
            </>
          ) : (
            <>
              <Route path="/" element={<SellerRegis />} />
              <Route path="/login" element={<Login />} />
              <Route path="/findId" element={<FindId />} />
              <Route path="/findId" element={<FindId />} />
              <Route path="/findPassword" element={<FindPassword />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
