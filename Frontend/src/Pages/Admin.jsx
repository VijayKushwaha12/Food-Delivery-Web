import React, { useState, useEffect } from "react";
import { FaUtensils, FaUsers, FaShoppingCart, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const API = "http://localhost:5000";

  const [foods, setFoods] = useState([]);

  const [form, setForm] = useState({
    food_name: "",
    price: "",
    food_category: "",
    food_type: "veg",
    food_image: null,
  });

  // ================= FETCH FOODS =================
  const fetchFoods = async () => {
    try {
      const res = await axios.get(`${API}/api/foods`);
      setFoods(res.data);
    } catch (error) {
      console.error("Error fetching foods", error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // ================= ADD FOOD =================
 const addFood = async () => {
  try {
    const formData = new FormData();

    formData.append("food_name", form.food_name);
    formData.append("food_category", form.food_category);
    formData.append("food_type", form.food_type);
    formData.append("price", form.price);

    if (form.food_image) {
      formData.append("food_image", form.food_image);
    }

    const res = await axios.post(
      "http://localhost:5000/api/foods/add",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log("Saved:", res.data);

    fetchFoods();

  } catch (error) {
    console.error("Frontend Error:", error.response?.data || error);
  }
};
  // ================= DELETE FOOD =================
  const deleteFood = async (id) => {
    try {
      await axios.delete(`${API}/api/foods/${id}`);
      fetchFoods();
    } catch (error) {
      console.error("Error deleting food", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-green-900 to-slate-800 text-white">
      
      {/* Sidebar */}
      <div className="w-64 bg-white/10 backdrop-blur-xl p-6 border-r border-white/20 shadow-xl">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="hover:text-green-400 cursor-pointer">Dashboard</li>
          <li className="hover:text-green-400 cursor-pointer">Food Items</li>
          <li className="hover:text-green-400 cursor-pointer">Orders</li>
          <li className="hover:text-green-400 cursor-pointer">Users</li>
        </ul>
        <button
          onClick={() => navigate("/")}
          className="mt-10 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-400 transition"
        >
          ← Back to Home
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/10 p-6 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center">
              <h3>Total Foods</h3>
              <FaUtensils className="text-green-400 text-2xl" />
            </div>
            <p className="text-3xl font-bold mt-4">{foods.length}</p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center">
              <h3>Total Orders</h3>
              <FaShoppingCart className="text-green-400 text-2xl" />
            </div>
            <p className="text-3xl font-bold mt-4">24</p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center">
              <h3>Total Users</h3>
              <FaUsers className="text-green-400 text-2xl" />
            </div>
            <p className="text-3xl font-bold mt-4">120</p>
          </div>
        </div>

        {/* Add Food */}
        <div className="bg-white/10 p-8 rounded-2xl shadow-xl mb-10">
          <h2 className="text-xl font-semibold mb-6">Add Food Item</h2>

          <div className="grid md:grid-cols-5 gap-4 mb-6">

            <input
              type="text"
              placeholder="Food Name"
              value={form.food_name}
              onChange={(e) =>
                setForm({ ...form, food_name: e.target.value })
              }
              className="p-3 rounded-lg bg-white/20 outline-none"
            />

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              className="p-3 rounded-lg bg-white/20 outline-none"
            />

            <input
              type="text"
              placeholder="Category"
              value={form.food_category}
              onChange={(e) =>
                setForm({ ...form, food_category: e.target.value })
              }
              className="p-3 rounded-lg bg-white/20 outline-none"
            />

            <select
              value={form.food_type}
              onChange={(e) =>
                setForm({ ...form, food_type: e.target.value })
              }
              className="p-3 rounded-lg bg-white/20 outline-none"
            >
              <option value="veg">Veg</option>
              <option value="non_veg">Non Veg</option>
            </select>

            <input
              type="file"
              onChange={(e) =>
                setForm({ ...form, food_image: e.target.files[0] })
              }
              className="p-3 rounded-lg bg-white/20 outline-none"
            />

          </div>

          <button
            onClick={addFood}
            className="bg-green-500 px-6 py-3 rounded-xl hover:bg-green-400 transition shadow-lg"
          >
            Add Food
          </button>
        </div>

        {/* Food Table */}
        <div className="bg-white/10 p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-6">Food Items</h2>

          <table className="w-full text-center">
            <thead className="bg-white/20">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Category</th>
                <th className="p-3">Type</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {foods.map((item) => (
                <tr key={item._id} className="border-b border-white/10">

                  <td className="p-3">
                    {item.food_image && (
                      <img
                        src={`${API}/uploads/${item.food_image}`}
                        alt={item.food_name}
                        className="w-16 h-16 object-cover rounded-lg mx-auto"
                      />
                    )}
                  </td>

                  <td className="p-3">{item.food_name}</td>
                  <td className="p-3">₹{item.price}</td>
                  <td className="p-3">{item.food_category}</td>
                  <td className="p-3">{item.food_type}</td>

                  <td className="p-3">
                    <button
                      onClick={() => deleteFood(item._id)}
                      className="bg-red-500 px-4 py-1 rounded-lg hover:bg-red-400 transition flex items-center gap-2 mx-auto"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>

                </tr>
              ))}

              {foods.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-6 text-gray-300">
                    No food items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default Admin;