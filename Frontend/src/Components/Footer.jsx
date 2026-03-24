import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-green-500 to-emerald-700 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">

        {/* Logo Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">FoodieApp</h2>
          <p className="text-sm text-gray-200">
            Delicious food delivered at your doorstep. Fresh, fast & affordable.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-gray-200 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Menu</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="flex flex-col gap-2 text-gray-200 text-sm">
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <div className="bg-white text-green-600 p-2 rounded-full cursor-pointer hover:scale-110 transition-all">
              <FaFacebookF />
            </div>
            <div className="bg-white text-green-600 p-2 rounded-full cursor-pointer hover:scale-110 transition-all">
              <FaInstagram />
            </div>
            <div className="bg-white text-green-600 p-2 rounded-full cursor-pointer hover:scale-110 transition-all">
              <FaTwitter />
            </div>
          </div>
        </div>

      </div>

      <div className="text-center py-4 border-t border-green-400 text-sm text-gray-200">
        © {new Date().getFullYear()} FoodieApp. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;