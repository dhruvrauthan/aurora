import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Landing from "./Landing";
import New from "./New"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/" element={<New />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;