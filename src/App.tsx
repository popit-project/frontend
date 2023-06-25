import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MainPage from "./pages/MainPage";
import SellerRegis from "./pages/SellerRegis";
import ProductRegis from "./pages/ProductRegis";
import { RecoilRoot } from "recoil";
import MapPage from "./pages/MapPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FindId from "./pages/FindId";
import FindPassword from "./pages/FindPassword";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SellerRegis />} />
          <Route path="/login" element={<Login />} />
          <Route path="/findId" element={<FindId />} />
          <Route path="/findId" element={<FindId />} />
          <Route path="/findPassword" element={<FindPassword />} />
        </Routes>
      </BrowserRouter>      
    </RecoilRoot>
  );
}

export default App;


