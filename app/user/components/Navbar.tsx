/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Menu, X, User, QrCode } from "lucide-react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white z-50 w-full shadow-md py-4 sticky top-0 left-0 px-6 md:px-12 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">Brand</div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-800"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <button className="flex items-center gap-2">
          <QrCode size={18} />
          Scan
        </button>

        {isLoggedIn ? (
          <button className="flex items-center gap-5 bg-gray-200 px-4 py-2 rounded-lg">
            <User size={20} />
            Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button className="bg-pink-700 px-3 py-1 text-white rounded-md hover:bg-pink-600 transition-all duration-300 ease-in-out hover:shadow-xl">
              Login
            </button>
          </div>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden">
          <button className="flex items-center gap-2">
            <QrCode size={18} />
            Scan QR
          </button>

          {isLoggedIn ? (
            <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg">
              <User size={20} />
              Profile
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <button>Login</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
