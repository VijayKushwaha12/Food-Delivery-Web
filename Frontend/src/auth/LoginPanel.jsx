import React, { useContext, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { dataContext } from "../context/UserContext";
import { isValidEmail } from "../utils/validation";

const LoginPanel = () => {
  const {
    showLogin,
    setShowLogin,
    setShowProfile,
    setShowSignup,
    setUser
  } = useContext(dataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async () => {
    if (!email || !password) return alert("All fields are required");
    if (!isValidEmail(email)) return alert("Enter a valid email");

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        resetForm();
        setShowLogin(false);
        setShowProfile(true);
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  const closePanel = () => {
    resetForm();
    setShowLogin(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-all duration-500 ${
        showLogin ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* 🔹 BACKGROUND OVERLAY */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closePanel}
      ></div>

      {/* 🔹 PANEL */}
      <div
        className={`relative w-[400px] h-full p-8 text-white 
        bg-gradient-to-br from-slate-900 via-green-900 to-slate-800
        shadow-2xl transition-all duration-500 ${
          showLogin ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Glow Effect */}
        <div className="absolute w-72 h-72 bg-green-400/30 rounded-full blur-3xl top-10 -left-20 animate-pulse"></div>

        {/* Header */}
        <header className="flex justify-between items-center relative z-10">
          <h2 className="text-2xl font-bold">Welcome Back 👋</h2>
          <RxCross1 onClick={closePanel} className="cursor-pointer text-xl" />
        </header>

        {/* Form */}
        <div className="mt-12 flex flex-col gap-6 relative z-10">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            onClick={handleLogin}
            className="p-3 rounded-xl bg-green-500 hover:bg-green-400 transition-all font-semibold shadow-lg hover:scale-105"
          >
            Login
          </button>

          <p className="text-center text-gray-300">
            Don't have an account?
            <span
              onClick={() => {
                resetForm();
                setShowLogin(false);
                setShowSignup(true);
              }}
              className="text-green-400 cursor-pointer ml-1 hover:underline"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPanel;