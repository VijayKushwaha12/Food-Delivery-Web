const mongoose = require("mongoose");
const Food = require("./models/Food");

mongoose.connect("mongodb://127.0.0.1:27017/foodApp");

const foods = [
  { food_name: "Pancakes", food_category: "breakfast", food_type: "veg", food_image: "image1.avif", price: 499 },
  { food_name: "Chicken Soup", food_category: "Soup", food_type: "non_veg", food_image: "image2.avif", price: 399 },
  { food_name: "Minestrone Soup", food_category: "Soup", food_type: "veg", food_image: "image3.avif", price: 349 },
  { food_name: "Spaghetti Carbonara", food_category: "pasta", food_type: "non_veg", food_image: "image4.avif", price: 999 },
  { food_name: "Veg Alfredo Pasta", food_category: "pasta", food_type: "veg", food_image: "image5.avif", price: 899 },
  { food_name: "Chicken Alfredo Pasta", food_category: "pasta", food_type: "non_veg", food_image: "image6.avif", price: 1099 },
  { food_name: "Paneer Butter Masala", food_category: "main_course", food_type: "veg", food_image: "image7.avif", price: 799 },
  { food_name: "Chicken Biryani", food_category: "main_course", food_type: "non_veg", food_image: "image8.avif", price: 1199 },
  { food_name: "Margherita Pizza", food_category: "pizza", food_type: "veg", food_image: "image9.avif", price: 649 },
  { food_name: "Pepperoni Pizza", food_category: "pizza", food_type: "non_veg", food_image: "image10.avif", price: 749 },
  { food_name: "Veggie Burger", food_category: "burger", food_type: "veg", food_image: "image11.avif", price: 499 },
  { food_name: "Chicken Burger", food_category: "burger", food_type: "non_veg", food_image: "image12.avif", price: 599 },
  { food_name: "Tomato Soup", food_category: "soups", food_type: "veg", food_image: "image13.avif", price: 299 },
  { food_name: "Egg Sandwich", food_category: "breakfast", food_type: "non_veg", food_image: "image14.avif", price: 349 },
  { food_name: "Mushroom Soup", food_category: "soups", food_type: "veg", food_image: "image15.avif", price: 349 },
  { food_name: "Chicken Tikka Masala", food_category: "main_course", food_type: "non_veg", food_image: "image16.avif", price: 1199 },
  { food_name: "Cheese Omelette", food_category: "breakfast", food_type: "non_veg", food_image: "image17.avif", price: 399 },
  { food_name: "Fettuccine Alfredo", food_category: "pasta", food_type: "veg", food_image: "image18.avif", price: 949 },
  { food_name: "Garlic Bread", food_category: "pizza", food_type: "veg", food_image: "image19.avif", price: 299 },
  { food_name: "Fish and Chips", food_category: "main_course", food_type: "non_veg", food_image: "image20.avif", price: 1099 },
  { food_name: "Hash Browns", food_category: "breakfast", food_type: "veg", food_image: "image21.avif", price: 249 },
  { food_name: "Vegetable Soup", food_category: "soups", food_type: "veg", food_image: "image22.avif", price: 329 },
  { food_name: "Egg Fried Rice", food_category: "main_course", food_type: "non_veg", food_image: "image23.avif", price: 599 },
  { food_name: "Hawaiian Pizza", food_category: "pizza", food_type: "non_veg", food_image: "image24.avif", price: 799 },
  { food_name: "Pasta Primavera", food_category: "pasta", food_type: "veg", food_image: "image25.avif", price: 899 }
];

const seedData = async () => {
  try {
    await Food.deleteMany();
    await Food.insertMany(foods);
    console.log("✅ All Food Data Inserted Successfully");
    process.exit();
  } catch (error) {
    console.log("❌ Error inserting data:", error);
    process.exit(1);
  }
};

seedData();