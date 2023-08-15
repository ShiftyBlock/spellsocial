import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Frontpage from "./Frontpage";
import Postpage from "./Postpage";
import React from "react";

const VideoPage = () => {
  React.useEffect(() => {
    window.location.href = "https://youtu.be/6BvQhnHrcqA";
    return null;
  });
  return null;
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Frontpage />} />
          <Route path="/post/:id" element={<Postpage />} />
          <Route exact path="/video" element={<VideoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
