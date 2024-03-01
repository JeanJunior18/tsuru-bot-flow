import React from "react";
import Flow from "./Flow";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Flow />} />
      </Routes>
    </BrowserRouter>
  );
}
