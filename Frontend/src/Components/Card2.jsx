import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { RemoveItem } from "../redux/cartSlice";

const Card2 = ({ name, id, price, image, qty }) => {
  const dispatch = useDispatch();

  return (
    // 🔹 OUTER (Perspective)
    <div
      className="group w-full"
      style={{ perspective: "1200px" }}
    >
      {/* 🔹 INNER (3D Motion) */}
      <div
        className="
          w-full h-[120px] p-3
          bg-white rounded-xl
          flex justify-between
          shadow-lg
          transform transition-all duration-300
          group-hover:-translate-y-2
          group-hover:[transform:rotateX(4deg)_rotateY(-4deg)]
          hover:shadow-2xl
        "
      >
        {/* LEFT SECTION */}
        <div className="w-[60%] h-full flex gap-5">
          
          {/* Image */}
          <div
            className="
              w-[50%] h-full overflow-hidden rounded-xl
              transform transition-all duration-300
              group-hover:scale-105
              group-hover:translate-z-10
            "
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="w-[40%] h-full flex gap-4 flex-col">
            <div className="text-lg text-gray-700 font-semibold">
              {name}
            </div>

            {/* Quantity Box */}
            <div
              className="
                w-[110px] h-[45px]
                bg-slate-400
                flex rounded-lg overflow-hidden
                border-2 border-green-400
                text-green-300 text-xl
                shadow-md
                transform transition-all duration-300
                group-hover:-translate-y-1
                group-hover:shadow-xl
              "
            >
              <button
                className="
                  w-[30%] bg-white
                  flex justify-center items-center
                  hover:bg-gray-200
                  active:scale-90
                "
              >
                -
              </button>

              <span className="w-[40%] flex justify-center items-center">
                {qty}
              </span>

              <button
                className="
                  w-[30%] bg-white
                  flex justify-center items-center
                  hover:bg-gray-200
                  active:scale-90
                "
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col items-end gap-4">
          <span className="text-xl text-green-500 font-semibold">
            ₹{price}
          </span>

          {/* Delete Icon */}
          <RiDeleteBin6Line
            onClick={() => dispatch(RemoveItem(id))}
            className="
              w-[28px] h-[28px]
              text-red-500 cursor-pointer
              transition-all duration-300
              hover:scale-125
              hover:rotate-12
              hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]
            "
          />
        </div>
      </div>
    </div>
  );
};

export default Card2;
