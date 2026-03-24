import React, { createContext, useState, useEffect } from "react";

export const dataContext = createContext();

const UserContext = ({ children }) => {

  // ✅ MAIN DATA (original backend data)
  const [foods, setFoods] = useState([]);

  // ✅ FILTERED DATA (used for display)
  const [cate, setCate] = useState([]);

  // ✅ SEARCH INPUT
  const [input, setInput] = useState("");

  // ✅ UI STATES
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // ✅ USER STATE (persist login)
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // ✅ SAVE USER IN LOCAL STORAGE
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <dataContext.Provider
      value={{
        // 🔹 FOOD DATA
        foods, setFoods,
        cate, setCate,

        // 🔹 SEARCH
        input, setInput,

        // 🔹 UI
        showCart, setShowCart,
        showLogin, setShowLogin,
        showSignup, setShowSignup,
        showProfile, setShowProfile,

        // 🔹 USER
        user, setUser
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export default UserContext;