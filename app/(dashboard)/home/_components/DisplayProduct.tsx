/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { motion } from 'framer-motion';

interface DisplayProductProps {
  imageUrl: string | null;
  productName: string;
  email: string;
  country: string;
  className?: string;
  handleAddStepOpen: (qrcode:string)=>void;
  productId:string;
}

const DisplayProduct: React.FC<DisplayProductProps> = ({
  imageUrl,
  productName,
  email,
  country,
  className = "",
  handleAddStepOpen,
  productId
}) => {
  return (
    <motion.div
      onClick={()=>{
        handleAddStepOpen(productId);
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group relative max-w-xs w-full cursor-pointer bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 ${className}`}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        {
          imageUrl ? (
            <img
              src={imageUrl}
              alt={productName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) :(
            <div className="flex w-full h-full justify-center items-center">
              No Image Found
            </div>
          )
        }
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {productName}
        </h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-300">
            <span className="text-xs font-medium text-gray-400">Email:</span>
            <p className="truncate">{email}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <span className="text-xs font-medium text-gray-400">Country:</span>
            <p>{country}</p>
          </div>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-white/10 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

export default DisplayProduct;