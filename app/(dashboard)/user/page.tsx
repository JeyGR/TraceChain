/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion, AnimatePresence } from "framer-motion";
import CardSection from "./components/CardSection";
import { useEffect, useState } from "react";
import { useDataStorageStore } from "@/utils/web3Fetch";
import {  attachIdToProductData, decryptAllProductData } from "@/utils/helper";



export const User = () => {

  const { getAllProductData, initializeWeb3 } = useDataStorageStore();

  const [allProductData, setAllProductData] = useState<any>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const initialize = await initializeWeb3();
  
      if(initialize === "success") {
        const response = await getAllProductData();
        const decryptedData = await decryptAllProductData(response[1]);
        const newArrayProduct = (await attachIdToProductData(decryptedData, response[0])).reverse();
        setAllProductData(newArrayProduct);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex w-full min-h-fit bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-[0.2] bg-white/80 backdrop-blur-lg border-r border-gray-200 p-6 hidden md:block shadow-lg"
      >
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h2>
          {/* Add sidebar navigation items here */}
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-6"
      >
        {/* Search Bar */}
        <div className="w-full flex justify-end mb-8">
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-gray-700 placeholder-gray-400 shadow-sm"
            />
            <svg 
              className="absolute right-3 top-3.5 w-5 h-5 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
        </div>

        {/* Card Section */}
        <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4 }}
            className="min-h-[400px]"
          >
            <AnimatePresence>
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-4"
                >
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="relative w-20 h-20"
                  >
                    <div className="absolute inset-0 border-4 border-emerald-200 rounded-full"></div>
                    <motion.div
                      className="absolute inset-0 border-4 border-transparent rounded-full"
                      style={{
                        borderTopColor: "#4f46e5",
                        borderRightColor: "#4f46e5"
                      }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </motion.div>
                  <motion.p
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                    className="text-gray-600 font-medium"
                  >
                    Loading Products...
                  </motion.p>
                </motion.div>
              ) : allProductData.length ? (
                <CardSection productData={allProductData} />
              ) : (
                <motion.div
                  key="no-data"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full gap-4 text-gray-500"
                >
                  <svg
                    className="w-20 h-20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-lg font-medium">No products found</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
      </motion.div>
    </div>
  );
};

export default User;