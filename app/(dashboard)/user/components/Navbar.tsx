"use client";

import React, { useEffect, useState } from "react";
import { Menu, X, User, QrCode, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { isLoggedIn as checkLogin } from "@/utils/helper";
import Link from "next/link";

const Navbar = ({
  isQrScannerOpen,
  setIsQrScannerOpen,
}: {
  isQrScannerOpen: boolean;
  setIsQrScannerOpen: (value: boolean) => void;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const logged = checkLogin();
    setIsLoggedIn(!logged);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    const logged = checkLogin();
    setIsLoggedIn(!logged);
  };

  const handleSignIn = () => {
    router.push("/usersignin");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md z-50 w-full shadow-sm py-4 sticky top-0 left-0 px-6 md:px-12 flex justify-between items-center border-b border-gray-100">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold"
      >
        <Link href={"/"} className="cursor-pointer">
        <h2 className="text-green-700 ">
          TraceChain
        </h2>
        </Link>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="md:hidden text-gray-800"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </motion.button>

      <div className="hidden md:flex items-center gap-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsQrScannerOpen(!isQrScannerOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
        >
          <QrCode size={20} className="text-emerald-600" />
          Scan QR
        </motion.button>

        {isLoggedIn ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSignIn}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <User size={20} className="text-white" />
            Sign In
          </motion.button>
        ) : (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            title="logout"
            className="flex items-center gap-2 cursor-pointer rounded-full p-2 hover:bg-red-50 transition-colors"
          >
            <LogOutIcon className="text-red-500 w-6 h-6" />
            <span className="text-red-600 font-medium hidden lg:inline">
              Log Out
            </span>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden"
          >
            <div className="flex flex-col items-center gap-4 py-4 px-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setIsQrScannerOpen(!isQrScannerOpen);
                  setMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-50 text-emerald-700"
              >
                <QrCode size={20} />
                Scan QR
              </motion.button>

              {isLoggedIn ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={handleSignIn}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg"
                >
                  <User size={20} />
                  Sign In
                </motion.button>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 rounded-lg hover:bg-red-50"
                >
                  <LogOutIcon className="w-6 h-6" />
                  Log Out
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;