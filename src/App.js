import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Sukses } from "./pages";
import { NavbarComponent } from "./components";
import './index.css';

function App() {
 return(
  <Router>
    <NavbarComponent dark={true} expand="sm" fixed="top" />
    <main>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/sukses" element={<Sukses />} />
    </Routes>
    </main>
  </Router>
)
}

export default App