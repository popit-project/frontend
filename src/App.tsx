import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Review from "./pages/Review";
import MainPage from "./pages/MainPage";
import SellerRegis from "./pages/SellerRegis";
import ProductRegis from "./pages/ProductRegis";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function App() {
  return (
    <RecoilRoot>
      <ProductRegis />
    </RecoilRoot>
  );
}

export default App;
