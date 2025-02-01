/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UserFeedback from "../components/UserFeedback";
import Image from "next/image";

const UniqueProductPage = ({
  params,
}: {
  params: Promise<{ unique_id: string }>;
}) => {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const fetchParam = async () => {
      const unwrappedParams = await params;
      const uniqueId = unwrappedParams.unique_id;
      if (uniqueId) setId(uniqueId);
    };
    fetchParam();
  }, []);

  const productDetails = [
    { Name: "Product name", Value: "Sample name" },
    { Name: "Product description", Value: "Sample description" },
    { Name: "Maximum retail price", Value: "499" },
    { Name: "Company", Value: "abc pvt ltd" },
    { Name: "Manufacturing Date", Value: "18/12/2025" },
    { Name: "Expiry date", Value: "12/12/2026" },
    { Name: "Contact info", Value: "abc@gmail.com" },
    { Name: "Net weight", Value: "45kg" },
    { Name: "Country of origin", Value: "India" },
    { Name: "Age restriction", Value: "Only for 16+" },
  ];

  return (
    <div className="h-screen w-full bg-white text-black">
      <Navbar />
      {/* {id && <div className="">{id}</div>} */}
      <div className="flex">
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
            <div className=" bg-white absolute top-7 rounded-full left-7 px-3">
              <p className="text-sm text-pink-700 font-semibold">
                Product Id: <span className="text-gray-600">#{id}</span>
              </p>
            </div>
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
    </div>
  );
};

export default UniqueProductPage;
