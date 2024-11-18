import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieSearch from "./pages/MovieSearch";
import "./App.css";
import emailjs from '@emailjs/browser';

emailjs.init('wciuI5vtvYyfew6j9'); // Replace with your public key

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<MovieSearch />} />
      </Routes>
    </Router>
  );
};

export default App;