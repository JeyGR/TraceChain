"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const SingleCard = ({
  id,
  pName,
  company,
  img,
}: {
  id: string;
  pName: string;
  company: string;
  img: string;
}) => {
  const router = useRouter();
  const handleViewClick = () => {
    router.push(`/user/${id}`);
  };

  return (
    <div className="border w-fit border-pink-600 shadow-xl rounded-2xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
      <div className="flex justify-center">
        <Image
          src={img}
          width={250}
          height={250}
          alt="product img"
          className="rounded-lg shadow-md border border-gray-300"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="mt-4 text-left">
          <h3 className="text font-bold text-gray-800">{pName}</h3>
          <p className="text-sm text-gray-600 italic">by {company}</p>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleViewClick}
            className="bg-pink-700 text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-pink-600 hover:shadow-lg transition duration-300 transform hover:scale-105"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
