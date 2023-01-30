import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PhoneBookList from "./phoneBookList";
import "./App.css";
import AddContact from "./pages/form";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<PhoneBookList />} />
          <Route path="/form" element={<AddContact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
