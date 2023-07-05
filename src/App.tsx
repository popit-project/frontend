import "./App.css";
import PopupListPage from "./pages/PopupListPage";
import PopupDetailPage from "./pages/PopupDetailPage";
import { MemoizedLoginPage } from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import MyProfilePage from "./pages/MyProfilePage";
import MainPage from "./pages/MainPage";
import SellerRegisPage from "./pages/SellerRegisPage";
import ProductRegisPage from "./pages/ProductRegisPage";
import { useRecoilValue } from "recoil";
import MapPage from "./pages/MapPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FindIdPage from "./pages/FindIdPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import SignUpPage from "./pages/SignUpPage";
import MainNav from "./components/MainNav";
import LoginNav from "./components/LoginNav";
import Footer from "./components/Footer";
import { LoginTokenAtom } from "./recoilAtom/LoginTokenAtom";
import SellerManagementPage from "./pages/SellerManagementPage";

function App() {
  const loginState = useRecoilValue(LoginTokenAtom);
  console.log(loginState);
  const isLoggedIn =
    localStorage.getItem("loginState") === "true" ? true : false;

  return (
    <>
      <BrowserRouter>
        {isLoggedIn ? (
          <>
            <MainNav />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/popuplist" element={<PopupListPage />} />
              <Route path="/popuplist/:id" element={<PopupDetailPage />} />
              <Route path="/seller" element={<SellerManagementPage />} />
              <Route path="/profile" element={<MyProfilePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/sellerRegisPage" element={<SellerRegisPage />} />
              <Route path="/productRegisPage" element={<ProductRegisPage />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <>
            <LoginNav />
            <Routes>
              <Route path="/" element={<MemoizedLoginPage />} />
              <Route path="/login" element={<MemoizedLoginPage />} />
              <Route path="/findId" element={<FindIdPage />} />
              <Route path="/findPassword" element={<FindPasswordPage />} />
              <Route path="/signUp" element={<SignUpPage />} />
            </Routes>
            <Footer />
          </>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
