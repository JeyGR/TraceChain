/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";

const SingleCard = ({ pName, img, company } :{pName: string, img: string, company:string}) => {
  return (
    <div className="h-full group relative cursor-pointer">
      <div className="w-[20rem] h-[12rem] rounded-2xl overflow-hidden bg-gray-100 relative">
        <img
          src={img}
          alt={pName}
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <motion.h3 
          className="text-xl font-semibold text-white mb-1"
          initial={{ y: 10 }}
          animate={{ y: 0 }}
        >
          {pName}
        </motion.h3>
        <p className="text-black font-medium">{company}</p>
      </div>

      <div className="absolute inset-0 border-2 border-white/20 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default SingleCard;