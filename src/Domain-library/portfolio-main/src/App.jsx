import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import { PageBuilder } from "./pages/PageBuilder";
import { portfolioData } from "./data/portfolioData";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Preloader from "./components/PreLoader";
import ScrollToTop from "./components/ScrollToTop";

import "./App.css";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar data={portfolioData} />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<PageBuilder initialBlocks={[{ id: "home-1", type: "Home", data: portfolioData }]} />} />
          <Route path="/skillset" element={<PageBuilder initialBlocks={[{ id: "skillset-1", type: "Skillset", data: portfolioData }]} />} />
          <Route path="/project" element={<PageBuilder initialBlocks={[{ id: "project-1", type: "Projects", data: portfolioData }]} />} />
          <Route path="/resume" element={<PageBuilder initialBlocks={[{ id: "resume-1", type: "Resume", data: portfolioData }]} />} />
          <Route path="/contact" element={<PageBuilder initialBlocks={[{ id: "contact-1", type: "Contact", data: portfolioData }]} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer data={portfolioData} />
      </div>
    </Router>
  );
}

export default App;
