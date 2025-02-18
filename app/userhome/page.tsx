"use client";
import "@radix-ui/themes/styles.css";
import { Montserrat } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import {EnterFullScreenIcon,} from '@radix-ui/react-icons';
import { useRouter } from "next/navigation";
import ProductScanner from "@/components/ProductScanner";


const montserrat = Montserrat({ subsets: ["latin"] });

const page = () => {
  const router = useRouter();
  const [isScannModalOpen, setIsScanModalOpen] = useState<boolean>(false);

  useEffect(()=>{
    if( !localStorage.getItem("token")){
        router.replace("/");
    }
  },[])
  const productDetails = [
    {
      Name: "Scan a product",
      Value:
        "Click the scan product button to open the scanner and scan the QR code in the scanner.",
    },
    {
      Name: "Check for product information",
      Value: "Product information will the added by the authorities. You can check them before purchase.",
    },
    {
      Name: "Check for product process",
      Value: "Pivotal process which are monitored by authorities are available here.",
    },

    {
      Name: "Add or view feedaback",
      Value: "You can see the feedbacks of the product and also can add some by your own.",
    },
  ];

  const handleScan = async(pid : string)=>{
    router.push(`/user/${pid}`);
    setIsScanModalOpen(false);
  }

  return (
    <div
      className={`max-w-screen w-full min-h-screen bg-gray-100 flex justify-between items-center ${montserrat.className}`}
    >
      <div className="md:w-1/4 h-screen bg-gray-200 p-5 border-r border-gray-300 hidden md:flex flex-col items-center gap-7">
        <h1 className="text-bold text-2xl font-extrabold text-neutral-700">
          How to use
        </h1>
        <div className="w-full flex flex-col gap-1 overflow-auto">
          <div className="w-full bg-white bg bg-opacity-45 rounded-lg flex flex-col gap-5 px-1 md:px-3 py-2 border-2 border-indigo-300 border-dashed overflow-auto scrollbar-custom">
            {productDetails.map((item, key) => (
              <h1 className="font-bold text-neutral-700" key={key}>
                {item.Name} - <span className="font-medium">{item.Value}</span>
              </h1>
            ))}
          </div>
        </div>
      </div>
      <div className="md:w-3/4 w-full min-h-screen flex flex-col p-5 items-center justify-center">
        <div className=" p-5 rounded-lg flex flex-col gap-5 items-center">
          <button
            className="px-6 py-2 bg-indigo-600 rounded text-xl font-semibold flex items-center gap-3 hover:bg-indigo-800"
            onClick={() => setIsScanModalOpen(true)}
          >
            <EnterFullScreenIcon className="w-6 h-6" />
            Scan a product
          </button>
        </div>
      </div>
      {isScannModalOpen && (
        <div>
          <div
            onClick={() => setIsScanModalOpen(false)}
            className="absolute top-0 left-0 z-[99999] h-screen w-full bg-black opacity-80  text-black"
          ></div>
          <div className="absolute top-1/2 w-full md:w-fit left-1/2 -translate-x-1/2 -translate-y-1/2  z-[99999999]">
            <ProductScanner
              setIsQrScannerOpen={() => setIsScanModalOpen(false)}
              handleScanned={handleScan}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
