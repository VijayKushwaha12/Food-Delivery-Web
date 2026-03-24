import React, { useContext, useEffect } from "react";
import Nav from "../Components/Nav";
import { categories } from "../Category";
import Card from "../Components/Card";
import { RxCross1 } from "react-icons/rx";
import { dataContext } from "../context/UserContext";
import Card2 from "../Components/Card2";
import { useSelector } from "react-redux";
import Footer from "../Components/Footer";
import axios from "axios";

import LoginPanel from "../auth/LoginPanel";
import SignupPanel from "../auth/SignupPanel";
import ProfilePanel from "../auth/ProfilePanel";

const Home = () => {

  // ✅ USE CONTEXT (NOT LOCAL STATE)
  const {
    foods,
    setFoods,
    cate,
    setCate,
    input,
    showCart,
    setShowCart,
    user,              // ✅ ADD THIS
  setShowLogin
  } = useContext(dataContext);

  // ================= FETCH DATA =================
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/foods")
      .then((res) => {
        setFoods(res.data);   // ✅ original data
        setCate(res.data);    // ✅ visible data
      })
      .catch((err) => console.log(err));
  }, []);

  // ================= FILTER =================
  function filter(Category) {
    if (Category === "All") {
      setCate(foods);
    } else {
      const newList = foods.filter(
        (item) => item.food_category === Category
      );
      setCate(newList);
    }
  }

  // ================= CART =================
  const items = useSelector((state) => state.cart);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const deliveryFee = 20;
  const taxes = subtotal * 0.5 / 100;
  const total = Math.floor(subtotal + deliveryFee + taxes);

  const placeOrder = async () => {

   if (!user || !user._id) {
  alert("⚠️ Please login first");
  setShowLogin(true);
  return;
}

    if (items.length === 0) {
      alert("🛒 Cart is empty");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/orders", {
        userId: user._id,
        items,
        totalAmount: total
      });

      alert("✅ Order placed successfully!");

      dispatch(ClearCart());
      setShowCart(false);

    } catch (error) {
      console.log(error);
      // alert("❌ Failed to place order");
    }
  };

 console.log("Foods:", foods);
      console.log("Cate:", cate);

  return (
    <div className="bg-slate-200 w-full min-h-screen">
      <Nav />

     

      {/* ================= CATEGORIES ================= */}
      {input.length === 0 && (
        <div className="flex flex-wrap justify-center gap-4 w-full mt-4">
          {categories.map((item) => (
            <div
              key={item.name}
              onClick={() => filter(item.name)}
              className="w-[120px] h-[120px] bg-white flex flex-col gap-3 px-4 py-2 justify-center items-center font-semibold shadow-xl rounded-2xl hover:bg-green-300 cursor-pointer transition"
            >
              {item.image}
              {item.name}
            </div>
          ))}
        </div>
      )}

      {/* ================= FOOD CARDS ================= */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {cate.map((item, index) => (
          <Card
            key={item._id}
            name={item.food_name}
            image={
              item.food_image?.startsWith("http")
                ? item.food_image
                : `http://localhost:5000/uploads/${item.food_image}`
            }
            price={item.price}
            id={item._id}
            type={item.food_type}
            index={index}
          />
        ))}
      </div>

      {/* ================= CART PANEL ================= */}
      <div
        className={`w-[40vw] h-full fixed top-0 right-0 bg-white shadow-xl p-7 overflow-auto transition-all duration-500 ${showCart ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <header className="flex justify-between">
          <span className="text-green-400 font-semibold">
            Order Item
          </span>
          <RxCross1
            className="cursor-pointer text-green-400"
            onClick={() => setShowCart(false)}
          />
        </header>

        <div className="mt-6 flex flex-col gap-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-400">
              Cart is empty
            </p>
          ) : (
            items.map((item) => (
              <Card2
                key={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                id={item.id}
                qty={item.qty}
              />
            ))
          )}
        </div>

        {/* BILL */}
        <div className="border-y mt-5 flex flex-col gap-5 p-5">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>₹{deliveryFee}</span>
          </div>

          <div className="flex justify-between">
            <span>Taxes</span>
            <span>₹{taxes.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-between p-5 font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={placeOrder}
          className="w-full p-3 bg-green-400 rounded-xl hover:bg-green-300 transition"
        >
          Place Order
        </button>
      </div>

      <LoginPanel />
      <SignupPanel />
      <ProfilePanel />
      <Footer />
    </div>
  );
};

export default Home;