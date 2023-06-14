import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Review from "./pages/Review";
import PopupListPage from "./pages/PopupListPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/popupList" element={<PopupListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
