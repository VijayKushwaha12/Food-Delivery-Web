import React, { useState, useContext } from "react";
import { dataContext } from "../context/UserContext";
import {
  isValidName,
  isValidEmail,
  isValidPassword
} from "../utils/validation";

const SignupPage = () => {
  const { setShowLogin } = useContext(dataContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ================= SIGNUP =================
  const handleSignup = async () => {
    const { name, email, password } = form;

    if (!name || !email || !password)
      return alert("All fields are required");

    if (!isValidName(name))
      return alert("Name must be at least 3 letters");

    if (!isValidEmail(email))
      return alert("Enter valid email");

    if (!isValidPassword(password))
      return alert("Password must be 6+ chars with letters & numbers");

    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Signup successful");
        setShowLogin(true);
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-green-900 to-black relative overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-green-400/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* 💎 Signup Card */}
      <div className="relative z-10 w-[380px] p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20">

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create Account 🚀
        </h2>

        {/* Inputs */}
        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="p-3 rounded-lg bg-white/20 text-white outline-none placeholder-gray-300"
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="p-3 rounded-lg bg-white/20 text-white outline-none placeholder-gray-300"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="p-3 rounded-lg bg-white/20 text-white outline-none placeholder-gray-300"
          />

          {/* Button */}
          <button
            onClick={handleSignup}
            className="bg-green-500 hover:bg-green-400 text-white p-3 rounded-xl transition-all shadow-lg"
          >
            Sign Up
          </button>

          {/* Switch to Login */}
          <p className="text-center text-gray-300">
            Already have an account?
            <span
              onClick={() => setShowLogin(true)}
              className="text-green-400 cursor-pointer ml-1"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignupPage;