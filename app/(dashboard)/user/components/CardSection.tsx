/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import SingleCard from "./SingleCard";
import { motion } from "framer-motion";

import { useRouter } from 'next/navigation';


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    }
  }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120
    }
  }
};


const CardSection = ({productData}: {productData:any}) => {
  const router = useRouter();
  
  const handleClick = async (productId:string | null) => {
    if(productId) {
      router.push(`/user/${productId}`)
    }
  }
  
  return (
    <div className="w-full py-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {productData?.map((data: any, index: any) => {
            
            const imageSrc =
              Object.keys(data).length >= 9 &&
              data[8]?.title === "Product Image" &&
              typeof data[8]?.value === "string" &&
              data[8]?.value.trim() !== ""
                ? data[8].value
                : null; 
            return (
              <motion.div
                onClick={() => handleClick(data.productId)}
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px -15px rgba(5, 150, 105, 0.2)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <SingleCard
                  pName={data[0]?.value}
                  img={imageSrc} 
                  company={data?.company}
                />
              </motion.div>
            );
          })}

        </motion.div>
      </div>
    </div>
  );
};

export default CardSection;
