/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import "@radix-ui/themes/styles.css";
import { Montserrat } from "next/font/google";
import React, { useEffect, useState } from "react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import AddFeedback from "@/components/AddFeedback";
import { useParams } from "next/navigation";

const montserrat = Montserrat({ subsets: ["latin"] });

const Page = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [pid, setPid] = useState<string | string[] | undefined>("");
  const params = useParams();

  useEffect(()=>{
    setPid(params?.pid);
  },[])
  const handleFeedBackModal = () => {
    setIsFeedbackOpen(false);
  };
  const handleFeedbackSubmit =()=>{
    console.log("Nothing");
    
  }
  
  

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

  const feedbacks = [
    {
        'Name': "Dhanush",
        "Date": "12/10/2025",
        "Time": "4:10",
        "Content": "I recently purchased the Samsung Galaxy S23 Ultra, and I’m really impressed by the design and build quality. The 6.8-inch Dynamic AMOLED 2X display is stunning with vibrant colors and deep blacks, making media consumption a joy. Whether I'm watching movies or browsing, the screen delivers a premium experience every time."
    },
    {
        'Name': "Priya",
        "Date": "15/10/2025",
        "Time": "2:30",
        "Content": "The Samsung Galaxy S23 Ultra has been an absolute powerhouse. The performance, thanks to the Snapdragon 8 Gen 2 chipset, is flawless. Whether I’m multitasking or playing graphic-heavy games, it never lags or stutters. The phone feels incredibly smooth, and I’ve never had an issue with responsiveness."
    },
    {
        'Name': "Ravi",
        "Date": "20/10/2025",
        "Time": "10:15",
        "Content": "The camera on the Samsung Galaxy S23 Ultra is beyond impressive. The 200MP main sensor captures incredible detail, and even low-light photos come out crisp and clear. The ultra-wide lens provides fantastic versatility, and the 8K video quality is exceptional, making it perfect for creators and videographers."
    },
    {
        'Name': "Aishwarya",
        "Date": "22/10/2025",
        "Time": "5:00",
        "Content": "I recently got the Samsung Galaxy S23 Ultra, and it’s been a great experience. The screen is incredibly bright and sharp, with vivid colors. Watching movies or playing games on it feels immersive. The size might be a bit large for some, but I love it for productivity tasks like reading or editing photos."
    },
    {
        'Name': "Vikram",
        "Date": "25/10/2025",
        "Time": "7:45",
        "Content": "After using the Samsung Galaxy S23 Ultra for a week, I can confidently say that the camera system is its strongest feature. The 200MP sensor captures stunningly detailed shots, and the 8K video quality is fantastic. The low-light performance is exceptional, and it rivals other flagship phones on the market."
    },
    {
        'Name': "Meera",
        "Date": "30/10/2025",
        "Time": "12:10",
        "Content": "The Samsung Galaxy S23 Ultra is an incredible phone. The performance is fast, and I haven’t experienced any lag or slowdown, even when running heavy apps or multitasking. The display is large, bright, and offers excellent color accuracy. I also love the fact that it supports fast charging and has great battery life."
    },
    {
        'Name': "Suresh",
        "Date": "5/11/2025",
        "Time": "3:20",
        "Content": "I’ve been using the Samsung Galaxy S23 Ultra for about a month, and it’s one of the best smartphones I’ve owned. The 6.8-inch display is perfect for watching content and gaming. The design is sleek, and the performance is top-notch. It’s one of the most powerful devices available right now."
    },
    {
        'Name': "Nisha",
        "Date": "7/11/2025",
        "Time": "9:00",
        "Content": "The battery life on the Samsung Galaxy S23 Ultra has been fantastic. I get through a full day of heavy use without needing to recharge, which is a huge plus. The phone also supports fast charging, so I’m never waiting long for a top-up. I’ve been using it for all my work tasks and media consumption, and it’s been great."
    },
    {
        'Name': "Arun",
        "Date": "10/11/2025",
        "Time": "8:30",
        "Content": "The Samsung Galaxy S23 Ultra is perfect for someone who enjoys high-quality content. The 200MP camera is amazing for photography, and the video recording capabilities in 8K are simply unbeatable. I’ve taken some amazing photos and videos during my travels, and they look stunning. The level of detail is unmatched by any other phone camera I’ve used."
    },
    {
        'Name': "Leena",
        "Date": "13/11/2025",
        "Time": "11:15",
        "Content": "I bought the Samsung Galaxy S23 Ultra as an upgrade from my old phone, and it’s been worth every penny. The display is absolutely stunning, and the camera is perfect for anyone who loves photography. Whether it’s day or night, the camera’s performance is top-tier. I’ve never been happier with a smartphone."
    },
    {
        'Name': "Rajesh",
        "Date": "18/11/2025",
        "Time": "4:45",
        "Content": "The Samsung Galaxy S23 Ultra is an absolute beast in terms of performance. The Snapdragon 8 Gen 2 chip ensures that everything runs smoothly, and I’ve had no issues with performance so far. Gaming, media consumption, and multitasking all feel effortless on this device. I can’t imagine going back to a slower phone after using this."
    },
    {
        'Name': "Kavitha",
        "Date": "19/11/2025",
        "Time": "6:30",
        "Content": "The Samsung Galaxy S23 Ultra is my perfect phone for photography and productivity. The camera’s 200MP sensor has captured some amazing shots, and the overall quality is top-tier. The performance is stellar as well, with no slowdowns, and the display is bright and clear, even in direct sunlight. It’s a great all-rounder."
    }
]

  return (
    <div
      className={`max-w-screen w-full min-h-screen bg-gray-100 flex justify-between items-center ${montserrat.className}`}
    >
      <div className="md:w-1/4 h-screen bg-gray-200 p-5 border-r border-gray-300 hidden md:flex flex-col items-center gap-7">
        <h1 className="text-bold text-2xl font-extrabold text-gray-800">Product details</h1>
        <div className="w-full flex flex-col gap-1 overflow-auto">
          <div className="w-full shadow-md rounded-lg flex flex-col gap-5 px-4 py-3 overflow-auto border-2 border-dashed border-indigo-300 bg-white bg-opacity-45">
            {productDetails.map((item, key) => (
              <h1 className="font-bold text-gray-800" key={key}>
                {item.Name} - <span className="font-medium text-gray-600">{item.Value}</span>
              </h1>
            ))}
          </div>
        </div>
      </div>
      <div className="md:w-3/4 w-full h-screen flex flex-col items-center overflow-y-auto">
        <div className="w-full h-12 bg-indigo-600 text-white py-2 px-5 shadow-md">
          <h1 className="text-xl font-medium text-center">User reviews</h1>
        </div>
        <div className="overflow-y-auto w-full flex-1 space-y-4 px-4 pb-14">
          {feedbacks.map((item, key) => (
            <div
              className="w-full px-4 py-3 bg-white shadow rounded-lg my-2 space-y-2"
              key={key}
            >
              <div className="flex items-center gap-2 border-b border-gray-300 pb-1">
                <div className="px-3 bg-blue-100 rounded-md w-fit flex">
                  <h1 className="text-gray-700 font-medium">{item.Name}</h1>
                </div>
                <h1 className="text-gray-600">
                  {item.Date} ~ {item.Time}
                </h1>
              </div>
              <h1 className="text-gray-700">{item.Content}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute right-5 bottom-5">
        <button
          className="px-5 py-2 bg-indigo-500 text-white rounded-lg flex gap-2 items-center font-semibold text-xl shadow-md hover:bg-indigo-600"
          onClick={() => setIsFeedbackOpen(true)}
        >
          <ChatBubbleIcon />
          Add
        </button>
      </div>
      {isFeedbackOpen && <AddFeedback close={handleFeedBackModal} handleAddFeedback={handleFeedbackSubmit} />}
    </div>
  );
};

export default Page;
