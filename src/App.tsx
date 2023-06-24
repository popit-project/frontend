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
import PopupListPage from "./pages/PopupListPage";
import MyProfilePage from "./components/MyProfilePage";
import Cart from "./pages/Cart";
import PopupDetail from "./pages/PopupDetail";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
              <Route path="/">
                <Login />
              </Route>
              <Route path="/">
                <SignUp />
              </Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
