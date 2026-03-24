const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Order = require("./models/Order");

const app = express();
app.use(cors());
app.use(express.json());

// ================= DATABASE =================
mongoose.connect("mongodb://127.0.0.1:27017/foodApp")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// ================= MODELS =================

// 🔹 Food Model
const foodSchema = new mongoose.Schema({
  food_name: { type: String, required: true },
  food_category: { type: String, required: true },
  food_type: { type: String, required: true },
  food_image: { type: String, default: "" },
  price: { type: Number, required: true }
});

const Food = mongoose.model("Food", foodSchema);

// 🔹 User Model (🔥 ADD THIS)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

// ================= CREATE UPLOADS FOLDER =================
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// ================= MULTER =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ================= STATIC =================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= ROUTES =================

// ROOT
app.get("/", (req, res) => {
  res.send("🚀 Food API is running successfully");
});

// ================= FOOD =================

// GET foods
app.get("/api/foods", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Order

app.post("/api/orders", async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    const newOrder = new Order({
      userId,
      items,
      totalAmount
    });

    await newOrder.save();

    res.json({ message: "Order placed successfully", newOrder });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Get User order
app.get("/api/orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ADD food
app.post("/api/foods/add", upload.single("food_image"), async (req, res) => {
  try {
    const newFood = new Food({
      food_name: req.body.food_name,
      food_category: req.body.food_category,
      food_type: req.body.food_type,
      price: req.body.price,
      food_image: req.file ? req.file.filename : ""
    });

    const savedFood = await newFood.save();
    res.status(201).json(savedFood);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE food
app.delete("/api/foods/:id", async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= USER AUTH (🔥 FIXED PART) =================

// SIGNUP
app.post("/api/users/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    // check existing user
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.json({ message: "Signup successful", user });

  } catch (error) {
    console.log(error); // 👈 IMPORTANT
    res.status(500).json({ error: "Server error" });
  }
});

// LOGIN
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// ================= SERVER =================
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});