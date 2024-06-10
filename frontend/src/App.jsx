import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import BikeAd from "./Pages/BikeAd.jsx";
import AnnexAd from "./Pages/AnnexAd.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bike-ad" element={<BikeAd />} />
        <Route path="/annex-ad" element={<AnnexAd />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App