import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import Login from "./Pages/Login";
import SignupPage from "./Pages/SignupPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default App;
