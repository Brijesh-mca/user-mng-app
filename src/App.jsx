import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import UserDetail from "./UserDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/user/:id" element={<UserDetail/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
