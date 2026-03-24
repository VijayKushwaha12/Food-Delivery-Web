import React, { useState, useContext } from "react";
import { dataContext } from "../context/UserContext";
import { isValidEmail } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const { setUser, setShowSignup } = useContext(dataContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN FUNCTION
  const handleLogin = async () => {
    if (!email || !password) return alert("All fields are required");
    if (!isValidEmail(email)) return alert("Enter valid email");

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        navigate("/"); // redirect to home
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#0f172a] via-[#064e3b] to-black text-white relative overflow-hidden">

      {/* 🔥 Glow Effects */}
      <div className="absolute w-[400px] h-[400px] bg-green-400/20 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-emerald-500/20 blur-3xl rounded-full bottom-[-150px] right-[-150px] animate-pulse"></div>

      {/* 🧊 Login Card */}
      <div className="w-[400px] p-8 rounded-2xl 
      bg-white/10 backdrop-blur-xl border border-white/20 
      shadow-2xl relative z-10">

        <h2 className="text-3xl font-bold text-center mb-8">
          Welcome Back 👋
        </h2>

        {/* Email */}
        <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3 mb-5">
          <FaEnvelope className="text-green-400" />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-transparent outline-none text-white"
          />
        </div>

        {/* Password */}
        <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3 mb-6">
          <FaLock className="text-green-400" />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-transparent outline-none text-white"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full p-3 rounded-xl 
          bg-gradient-to-r from-green-400 to-emerald-500 
          font-semibold transition-all duration-300
          hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.7)]"
        >
          Login
        </button>

        {/* Signup */}
        <p className="text-center mt-6 text-gray-300">
          Don't have an account?
          <span
            onClick={() => navigate("/signup")}
            className="text-green-400 cursor-pointer ml-1 hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;