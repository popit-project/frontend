import { useEffect, useState } from "react";
import "./App.css";
import PopupListPage from "./pages/PopupListPage";
import PopupDetailPage from "./pages/PopupDetailPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import MyProfilePage from "./pages/MyProfilePage";
import MainPage from "./pages/MainPage";
import SellerRegisPage from "./pages/SellerRegisPage";
import ProductRegisPage from "./pages/ProductRegisPage";
import { RecoilRoot } from "recoil";
import MapPage from "./pages/MapPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FindIdPage from "./pages/FindIdPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import SignUpPage from "./pages/SignUpPage";
import MainNav from "./components/MainNav";
import LoginNav from "./components/LoginNav";
import Footer from "./components/Footer";

function App() {
  // useEffect(() => {
  //   if (localStorage.getItem("userId")){
  //     setIsLoggedIn(true);
  //   }
  // }, [])
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
      <RecoilRoot>
          <BrowserRouter>
              {isLoggedIn ? (
                  <>
                      <MainNav />
                      <Routes>
                          <Route path="/" element={<MainPage />} />
                          <Route path="/map" element={<MapPage />} />
                          <Route
                              path="/popuplist"
                              element={<PopupListPage />}
                          />
                          <Route
                              path="/popuplist/:id"
                              element={<PopupDetailPage />}
                          />
                          <Route path="/seller" element={<PopupDetailPage />} />
                          <Route path="/profile" element={<MyProfilePage />} />
                          <Route path="/cart" element={<CartPage />} />
                          <Route
                              path="/sellerRegisPage"
                              element={<SellerRegisPage />}
                          />
                          <Route
                              path="/productRegis"
                              element={<ProductRegisPage />}
                          />
                      </Routes>
                      <Footer />
                  </>
              ) : (
                  <>
                      <LoginNav />
                      <Routes>
                          <Route path="/" element={<LoginPage />} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/findId" element={<FindIdPage />} />
                          <Route
                              path="/findPassword"
                              element={<FindPasswordPage />}
                          />
                          <Route path="/signUp" element={<SignUpPage />} />
                      </Routes>
                      <Footer />
                  </>
              )}
          </BrowserRouter>
      </RecoilRoot>
  );
}


export default App;


