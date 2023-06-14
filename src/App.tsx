import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Review from "./pages/Review";
import PopupListPage from "./pages/PopupListPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PopupDetail from "./pages/PopupDetailPage";

function App() {
  return (
    <>
      <PopupListPage />
      {/* <PopupDetail /> */}
    </>
  );
}

export default App;
