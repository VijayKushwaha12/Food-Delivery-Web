import React, { useContext } from "react";
import { LuLeafyGreen } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { AddItem } from "../redux/cartSlice";
import { dataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Card = ({ name, image, id, price, type, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Get user
  const { user } = useContext(dataContext);

  const handleAddToCart = () => {
    // ❌ Not logged in → redirect to full login page
    if (!user) {
      alert("⚠️ Please login first");
      navigate("/login");
      return;
    }

    // ✅ Add to cart
    dispatch(
      AddItem({
        id,
        name,
        price,
        image,
        type,
        qty: 1,
      })
    );
  };

  return (
    <div
      className="group w-[300px] h-[400px]"
      style={{ perspective: "1200px" }}
    >
      {/* 🔥 CARD */}
      <div
        className="
          h-full p-3 rounded-2xl
          bg-white/10 backdrop-blur-xl
          border border-white/20
          flex flex-col gap-3
          shadow-xl
          transition-all duration-500
          group-hover:-translate-y-4
          group-hover:shadow-green-500/30
          group-hover:[transform:rotateX(6deg)_rotateY(6deg)]
        "
        style={{ animationDelay: `${index * 0.2}s` }}
      >
        {/* 🖼 IMAGE */}
        <div className="w-full h-[70%] overflow-hidden rounded-xl">
          <img
            src={image}
            alt={name}
            className="
              w-full h-full object-cover
              transition-transform duration-500
              group-hover:scale-110
            "
          />
        </div>

        {/* 🍔 NAME */}
        <div className="text-xl font-semibold text-white">
          {name}
        </div>

        {/* 💰 PRICE + TYPE */}
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold text-green-400">
            ₹{price}
          </div>

          <div className="flex items-center gap-2 text-green-400 text-sm">
            <LuLeafyGreen />
            <span>{type}</span>
          </div>
        </div>

        {/* 🛒 BUTTON */}
        <button
          onClick={handleAddToCart}
          className="
            w-full p-3 rounded-xl
            bg-gradient-to-r from-green-400 to-emerald-500
            text-white font-semibold
            transition-all duration-300
            hover:scale-105
            hover:shadow-[0_0_20px_rgba(34,197,94,0.7)]
            active:scale-95
          "
        >
          Add to Dish
        </button>
      </div>
    </div>
  );
};

export default Card;