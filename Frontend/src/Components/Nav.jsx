import React, { useContext, useEffect } from "react";
import { MdFastfood } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { FaUserCircle, FaUserShield } from "react-icons/fa";
import { dataContext } from "../context/UserContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const {
    input,
    setInput,
    cate,
    setCate,
    setShowCart,
    setShowLogin,
    setShowProfile,
    user,
    foods // ✅ original full data (IMPORTANT)
  } = useContext(dataContext);

  const items = useSelector(state => state.cart);
  const navigate = useNavigate();

  // ================= SEARCH FIX =================
  useEffect(() => {
    if (!input) {
      setCate(foods); // ✅ reset to full list
    } else {
      const filtered = foods.filter((item) =>
        item.food_name.toLowerCase().includes(input.toLowerCase())
      );
      setCate(filtered);
    }
  }, [input, foods]);

  return (
    <div className="w-full h-[100px] flex justify-between items-center px-6">

      {/* LOGO */}
      <div className="w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl">
        <MdFastfood className="w-[30px] h-[30px] text-green-500" />
      </div>

      {/* SEARCH */}
      <form
        className="w-[50%] h-[50px] bg-white flex items-center px-5 gap-3 rounded-md shadow-xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <FaSearch className="text-green-400 w-[20px] h-[20px]" />
        <input
          type="text"
          placeholder="Search food..."
          className="w-full outline-none text-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>

      {/* USER SECTION */}
      <div className="flex items-center gap-4">

        {/* ✅ SHOW USER NAME */}
        {user ? (
          <div
            onClick={() => setShowProfile(true)}
            className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow cursor-pointer"
          >
            <FaUserCircle className="text-green-500 text-2xl" />
            <span className="text-green-600 font-semibold">
              {user.name}
            </span>
          </div>
        ) : (
          <div
            onClick={() => {
              setShowCart(false);
              setShowLogin(true);
            }}
            className="w-[60px] h-[60px] cursor-pointer bg-white flex justify-center items-center rounded-md shadow-xl"
          >
            <FaUserCircle className="w-[30px] h-[30px] text-green-500" />
          </div>
        )}

        {/* ADMIN */}
        <div
          onClick={() => navigate("/admin")}
          className="w-[60px] h-[60px] cursor-pointer bg-white flex justify-center items-center rounded-md shadow-xl"
        >
          <FaUserShield className="w-[28px] h-[28px] text-green-500" />
        </div>

        {/* CART */}
        <div
          onClick={() => setShowCart(true)}
          className="w-[60px] h-[60px] cursor-pointer bg-white flex justify-center items-center rounded-md shadow-xl relative"
        >
          <span className="absolute top-0 right-2 text-green-500 font-bold">
            {items.length}
          </span>
          <FiShoppingBag className="w-[30px] h-[30px] text-green-500" />
        </div>

      </div>
    </div>
  );
};

export default Nav;