import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Review from "./pages/Review";
import MainPage from "./pages/MainPage";
// import SellerRegis from "./pages/SellerRegis";
import PopupListPage from "./pages/PopupListPage";
import PopupDetail from "./pages/PopupDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./tailwind.css";
import { RecoilRoot } from "recoil";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      {/* <SellerRegis /> */}
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<PopupListPage />} />
            <Route path={"/:id"} element={<PopupDetail />} />
            <Route path={"/cart"} element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
