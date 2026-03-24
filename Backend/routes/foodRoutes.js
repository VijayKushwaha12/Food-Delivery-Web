const express = require("express");
const router = express.Router();
const Food = require("../models/Food");
const multer = require("multer");
const path = require("path");


// ================= IMAGE STORAGE CONFIG =================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder name
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


// ================= GET ALL FOOD =================

router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch food" });
  }
});


// ================= ADD FOOD WITH IMAGE =================

router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const food = new Food({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      image: req.file ? req.file.filename : "",
    });

    await food.save();

    res.json({ message: "Food added successfully", food });
  } catch (err) {
    res.status(500).json({ error: "Failed to add food" });
  }
});

module.exports = router;