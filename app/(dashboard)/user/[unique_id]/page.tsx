/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import UserFeedback from "../components/UserFeedback";
import { useParams } from "next/navigation";
import { useDataStorageStore } from "@/utils/web3Fetch";
import { decryptAllData, decryptData } from "@/utils/helper";
import { useRouter } from "next/navigation";

const UniqueProductPage = () => {
  const router = useRouter();

  const { initializeWeb3, fetchProductDataWithId, fetchProcessWithId } = useDataStorageStore();

  const [productDetails, setproductDetails] = useState<any>([]);
  const [processDetails, setprocessDetails] = useState<any>([]);
  const params = useParams();


  const fetchProductProcessWithId = async (productId:string | string[]) => {
    const processData = await fetchProcessWithId(productId);
    if(!processData) {
      return;
    }
    const decryptData = await decryptAllData(processData);
    
    setprocessDetails(decryptData);
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const initialize = await initializeWeb3();
      if(initialize === "success") {
        if(params?.unique_id) {
          const productId = params?.unique_id;
          const getProduct = await fetchProductDataWithId(productId);
          const decrypt = await  decryptData(getProduct);
          setproductDetails(decrypt);
          await fetchProductProcessWithId(params?.unique_id);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-fit bg-white text-black flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 bg-gray-50 p-6 border-r border-gray-200 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="relative w-full h-fit mb-6">
            <button
              onClick={() => router.back()}
              className="absolute top-2 left-2 z-10 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all"
              aria-label="Go back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            {productDetails[8]?.value && (
            <img
              src={productDetails[8]?.value}
              className="rounded-lg object-contain h-60 w-full"
              alt="Product image"
            />
            )}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h1>
            <div className="grid grid-cols-1 gap-3">
              {productDetails?.map((item:any, key:any) => {
                if(item?.title !== "Product Image") {
                  return (
                  <div key={key} className="flex justify-between items-start py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">{item?.title}</span>
                    <span className="text-gray-800 text-right">{item?.value}</span>
                  </div>
                )
                }
              })}
            </div>
          </div>
          
          {processDetails.length !==0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Process</h1>
            <div className="space-y-8">
              {processDetails?.map((process: any, index: number) => (
                <div key={index} className="border-b border-gray-100 pb-8 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {process.title}
                  </h3>
                  
                  {process.description && (
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {process.description}
                    </p>
                  )}

                  {process.images && process.images.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {process.images.map((image: string, imgIndex: number) => (
                        <div key={imgIndex} className="relative group">
                          <img
                            src={image}
                            alt={`Process step ${index + 1} image ${imgIndex + 1}`}
                            className="rounded-lg object-cover h-48 w-full border border-gray-200 transition-transform group-hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          )}
        </div>

        <div className="w-full md:w-1/2 bg-gray-50 p-6 overflow-y-auto h-[calc(100vh-4rem)]">
          <UserFeedback />
        </div>
      </div>
    </div>
  );
};

export default UniqueProductPage;