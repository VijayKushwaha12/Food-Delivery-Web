import React, { useContext, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { dataContext } from "../context/UserContext";
import {
  isValidName,
  isValidEmail,
  isValidPassword
} from "../utils/validation";

const SignupPanel = () => {
  const { showSignup, setShowSignup, setShowLogin } =
    useContext(dataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Clear form
  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  // Signup using MongoDB backend
  const handleSignup = async () => {
    if (!name || !email || !password)
      return alert("All fields are required");

    if (!isValidName(name))
      return alert("Name must be at least 3 letters");

    if (!isValidEmail(email))
      return alert("Enter a valid email");

    if (!isValidPassword(password))
      return alert("Password must be 6+ chars with letters & numbers");

    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful!");
        resetForm();
        setShowSignup(false);
        setShowLogin(true);
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  const closePanel = () => {
    resetForm();
    setShowSignup(false);
  };

  return (
    <div
      className={`fixed top-0 right-0 w-[35vw] h-full bg-white shadow-xl p-8
      transition-all duration-500 ${
        showSignup ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <header className="flex justify-between">
        <span className="text-green-400 font-semibold">Sign Up</span>
        <RxCross1 onClick={closePanel} className="cursor-pointer" />
      </header>

      <div className="mt-10 flex flex-col gap-5">
        <input
          type="text"
          placeholder="Name"
          value={name}
          className="border p-3 rounded-lg"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          className="border p-3 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="border p-3 rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="bg-green-400 text-white p-3 rounded-xl"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignupPanel;
