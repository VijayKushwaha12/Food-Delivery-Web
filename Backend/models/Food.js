const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    food_name: {
      type: String,
      required: true,
    },
    food_category: {
      type: String,
      required: true,
    },
    food_type: {
      type: String,
      required: true,
    },
    food_image: {
      type: String,
      default: "",   // ⚠️ IMPORTANT (remove required)
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);