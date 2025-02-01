import React from "react";
import Navbar from "./components/Navbar";
import CardSection from "./components/CardSection";

const User = () => {
  return (
    <div className="w-full h-screen bg-white text-black">
      <Navbar />
      <div className="flex w-full ">
        <div className="flex-[0.2] bg-red-100"></div>
        <div className="bg--100 flex-[0.8]">
          <div className="w-full flex justify-end px-5 py-5">
            <input
              type="text"
              placeholder="Search...."
              className="px-3 py-1 tracking-wide outline-none border-pink-700 border rounded-sm shadow-lg"
            />
          </div>
          <div className="">
            <CardSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
