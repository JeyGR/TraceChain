/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Cross2Icon } from '@radix-ui/react-icons';

const ImageUpload = ({ setImageFile }: { setImageFile: (value: File | null) => void }) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md p-6 border-2 border-dashed border-white/10 rounded-xl bg-gray-900/50 backdrop-blur-lg shadow-2xl text-center"
    >
      <div className="space-y-6">
        {!image && (
          <div className="space-y-2">
            <label className="cursor-pointer inline-block">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={fileInputRef}
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-green-500/80 to-blue-500/80 hover:from-green-600/80 hover:to-blue-600/80 text-white rounded-lg font-medium transition-all duration-300"
              >
                Upload Image
              </motion.div>
            </label>
            <p className="text-sm text-gray-400 mt-2">
              PNG, JPG, JPEG (max 5MB)
            </p>
          </div>
        )}

        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group mx-auto w-48 h-48"
          >
            <div className="absolute top-2 right-2 z-10">
              <motion.button
                type="button"
                onClick={handleRemoveImage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 bg-red-500/90 hover:bg-red-600/90 rounded-full shadow-lg transition-colors"
              >
                <Cross2Icon className="w-4 h-4 text-white" />
              </motion.button>
            </div>
            <img 
              src={image} 
              alt="Preview" 
              className="w-full h-full object-cover rounded-xl border-2 border-white/10 hover:border-blue-400/30 transition-all"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent rounded-xl" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ImageUpload;