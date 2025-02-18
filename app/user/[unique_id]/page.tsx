"use client";

import React, { useEffect, useState } from "react";
import UserFeedback from "../components/UserFeedback";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation";

const UniqueProductPage = () => {
  const [productDetails, setproductDetails] = useState<{Name:string,Value:string}[]>([{ Name: "Product name", Value: "Sample name" },
    { Name: "Product description", Value: "Sample description" },
    { Name: "Maximum retail price", Value: "499" },
    { Name: "Company", Value: "abc pvt ltd" },
    { Name: "Manufacturing Date", Value: "18/12/2025" },
    { Name: "Expiry date", Value: "12/12/2026" },
    { Name: "Contact info", Value: "abc@gmail.com" },
    { Name: "Net weight", Value: "45kg" },
    { Name: "Country of origin", Value: "India" },
    { Name: "Age restriction", Value: "Only for 16+" },]);
    const [pid, setPid] = useState<any>("");
    const params =useParams();
  useEffect(()=>{
    setPid(params?.unique_id);
  },[])


  return (
    <div className="max-h-screen w-full bg-white text-black">
      <div className="flex h-full overflow-y-scroll">
        <div className="flex-1 bg-gray-300 w-full h-screen overflow-y-auto">
          <div className="relative">
            <Image
              src={
                "https://images.unsplash.com/photo-1656489782764-443559c29211?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMHx8fGVufDB8fHx8fA%3D%3D"
              }
              width={100}
              height={500}
              className="w-full px-4 py-5 rounded-md"
              alt="product imag"
            />
          </div>
          <div className="h-screen bg-gray-200 p-5 border-r border-gray-300 hidden md:flex flex-col items-center gap-7">
            <h1 className="text-bold text-2xl font-extrabold text-gray-800">
              Product details
            </h1>
            <div className="w-full flex flex-col gap-1 overflow-auto">
              <div className="w-full shadow-md rounded-lg flex flex-col gap-5 px-4 py-3 overflow-auto border-2 border-dashed border-indigo-300 bg-white bg-opacity-45">
                {productDetails.map((item, key) => (
                  <h1 className="font-bold text-gray-800" key={key}>
                    {item.Name} -{" "}
                    <span className="font-medium text-gray-600">
                      {item.Value}
                    </span>
                  </h1>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-red-100 w-full h-screen">
          <UserFeedback />
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default UniqueProductPage;
