"use client";
import "@radix-ui/themes/styles.css";
import { Montserrat } from 'next/font/google'
import React, { useState } from 'react'
import {PlusIcon} from '@radix-ui/react-icons';
import {EnterFullScreenIcon,} from '@radix-ui/react-icons';
import AddProduct from '@/components/AddProduct';
import AddStep from '@/components/AddStep';

const montserrat = Montserrat({subsets:["latin"]})

const page = () => {
    const productDetails = [
        {
            "Name" : "Product name",
            "Value" : "Sample name kjn jih uhiuhuhu  uh9uhfd oihdsf oiihf iuhjsdf ijohdfjn"
        },
        {
            "Name" : "Product description",
            "Value" : "Sample description"
        },
        {
            "Name" : "Maximum retail price",
            "Value" : "499"
        },
        {
            "Name" : "Company",
            "Value" : "abc pvt ltd"
        },
        {
            "Name" : "Manufacturing Date",
            "Value" : "18/12/2025"
        },
        {
            "Name" : "Expiry date",
            "Value" : "12/12/2026"
        },
        {
            "Name" : "Contact info",
            "Value" : "abc@gmail.com"
        },
        {
            "Name" : "Net weight",
            "Value" : "45kg"
        },
        {
            "Name" : "Country of origin",
            "Value" : "India"
        },
        {
            "Name" : "Age restriction",
            "Value" : "Only for 16+"
        },
    ]

  return (
    <div
      className={`max-w-screen w-full min-h-screen bg-gray-100 flex justify-between items-center ${montserrat.className}`}
    >
      <div className="md:w-1/4 h-screen bg-gray-200 p-5 border-r border-gray-300 hidden md:flex flex-col items-center gap-7">
        <h1 className="text-bold text-2xl font-extrabold text-neutral-700">How to use</h1>
        <div className="w-full flex flex-col gap-1 overflow-auto">
        <div className="w-full bg-white bg bg-opacity-45 rounded-lg flex flex-col gap-5 px-1 md:px-3 py-2 border-2 border-indigo-300 border-dashed overflow-auto scrollbar-custom">
            {productDetails.map((item, key)=>(
            <h1 className="font-bold text-neutral-700" key={key}>
                {item.Name} - <span className="font-medium">{item.Value}</span>
              </h1>
            ))}
        </div>
        </div>
      </div>
      <div className='md:w-3/4 w-full min-h-screen flex flex-col p-5 items-center justify-center'>
            <div className=' p-5 rounded-lg flex flex-col gap-5 items-center'>
            <button className='px-6 py-2 bg-indigo-600 rounded text-xl font-semibold flex items-center gap-3 hover:bg-indigo-800'><EnterFullScreenIcon className='w-6 h-6'/>Scan a product</button>
            </div>
      </div>
    </div>
  );
}

export default page