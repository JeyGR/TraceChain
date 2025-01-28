"use client";
import {
  Box,
  Button,
  Card,
  Theme,
  ThemeContext,
  ThemePanel,
} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Montserrat } from "next/font/google";
import React, { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { EnterFullScreenIcon } from "@radix-ui/react-icons";
import AddProduct from "@/components/AddProduct";
import AddStep from "@/components/AddStep";

const montserrat = Montserrat({ subsets: ["latin"] });

const Home = () => {
  // const [name, setName] = useState("Hey this is name");
  // const [email, setEmail] = useState("Hey this is Email");
  // const [desig, setDesig] = useState("Hey this is Designation");
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isStepModal, setIsStepModal] = useState(false);

  const [authorityDetails, setAuthorityDetails] = useState<{
    name: string;
    email: string;
    desig: string;
  }>({
    name: "Hey This is name",
    email: "Hey this is Email",
    desig: "Hey this is Designation",
  });

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleStepModalClose = () => {
    setIsStepModal(false);
  };

  return (
    <div
      className={`max-w-screen w-full min-h-screen bg-neutral-900 flex justify-between items-center ${montserrat.className}`}
    >
      <div className="md:w-1/4 min-h-screen p-5 border-r-2 border-r-neutral-800 hidden md:flex flex-col items-center gap-7">
        <h1 className="text-bold text-2xl font-extrabold">My profile</h1>
        <div className="w-full flex flex-col gap-1">
          <h1 className="text-xl font-bold">Details </h1>
          <div className="w-full bg-neutral-400 bg-opacity-30 rounded-lg flex flex-col gap-5 px-1 md:px-3 py-2 border-2 border-opacity-10 border-neutral-100">
            <h1 className="font-bold">
              Name :{" "}
              <span className="font-medium">{authorityDetails.name}</span>
            </h1>
            <h1 className="font-bold">
              Email :{" "}
              <span className="font-medium">{authorityDetails.email}</span>
            </h1>
            <h1 className="font-bold">
              Designation :{" "}
              <span className="font-medium">{authorityDetails.desig}</span>
            </h1>
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <h1 className="text-xl font-bold">Products </h1>
          <div>
            <div className="w-full bg-neutral-400 bg-opacity-30 rounded-lg flex flex-col gap-5 px-1 md:px-3 py-2 border-2 border-opacity-10 border-neutral-100">
              {products.length === 0 ? (
                <div className="text-sm font-normal text-blue-500">
                  No products found!
                </div>
              ) : (
                <div></div>
              )}
              {/* product catalog goes here */}
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-3/4 w-full min-h-screen flex flex-col p-5 items-center justify-center">
        <div className=" p-5 rounded-lg flex flex-col gap-5 items-center">
          <button
            className="px-8 py-1 bg-blue-600 rounded text-xl font-semibold flex items-center gap-3 hover:bg-blue-800"
            onClick={() => setIsOpen(true)}
          >
            <PlusIcon className="w-6 h-6" />
            Add new
          </button>
          <button
            className="px-8 py-1 bg-blue-600 rounded text-xl font-semibold flex items-center gap-3 hover:bg-blue-800"
            onClick={() => setIsStepModal(true)}
          >
            <EnterFullScreenIcon className="w-6 h-6" />
            Scan
          </button>
        </div>
      </div>
      {isOpen && <AddProduct close={handleModalClose} />}
      {isStepModal && <AddStep close={handleStepModalClose} />}
    </div>
  );
};

export default Home;
