"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Button, IconButton, Select, TextField, Theme } from '@radix-ui/themes';
import React, {  useRef, useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { createUniqueId, encryptData, uploadIageToCloudinary } from '@/utils/helper';
import { useDataStorageStore } from "@/utils/web3Fetch"
import ImageUpload from './ImageUpload';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface modalProps {
  close: () => void;
  setAllProductData: (data: any) => void;
  allProductData: any;
}

const AddProduct: React.FC<modalProps> = ({ close, setAllProductData, allProductData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);
  const [selectedType, setSelectedType] = useState<string>("select");
  const [formData, setFormData] = useState<{ title: string; placeholder: string; type: any; value: string }[]>([
    { title: "Product Name", placeholder: "eg: yoga bar, coke, tropicana", type: "text", value: "" },
    { title: "Product description", placeholder: "eg: natural energy bar", type: "text", value: "" },
    { title: "Maximum retail price", placeholder: "eg: ₹499", type: "text", value: "" },
    { title: "Company", placeholder: "eg: abc pvt. ltd.", type: "text", value: "" },
    { title: "Contact info", placeholder: "eg: abc.enquiry@gmail.com", type: "text", value: "" },
    { title: "Net weight", placeholder: "eg: 1.5kg", type: "text", value: "" },
    { title: "Country of origin", placeholder: "eg: India", type: "text", value: "" },
    { title: "Age restriction", placeholder: "eg: only for 16+", type: "text", value: "" }
  ]);

  const [imageFile, setImageFile] = useState<File | null>(null);


  const {addNewProduct} = useDataStorageStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  

  const handleAddProperty = () => {
    if (titleRef.current?.value === "" || selectedType === "select" || valueRef.current?.value === "") {
      toast.error("All values must be entered!");
      return;
    } else {
      const newProperty = {
        title: String(titleRef.current?.value),
        placeholder: String(valueRef.current?.value),
        value:"",
        type: selectedType
      };
      setFormData([...formData, newProperty]);
      setIsOpen(false);
    }
  };

  const handleBlockchainPost = async (imageUrl: string) => {
    try {
      const newFormData = [
        ...formData,
        {
          title: "Product Image",
          placeholder: "eg: Upload Product Image",
          value: imageUrl
        }
      ];      
      const uniqueId = createUniqueId();
      const dataEncrypt = encryptData(newFormData);
      const response = await addNewProduct(uniqueId, dataEncrypt);

      if(response) {
        const newlyAddeddata = [{...newFormData, productId: uniqueId}];
        setAllProductData([...newlyAddeddata, ...allProductData])
      }
      
     
       
      return response;
    } catch (error) {
      console.error("Blockchain Error:", error);
      toast.error("Error adding product to blockchain");
      return null;
    }
  };
  
  const handleSubmit = async () => {
    try {
      for (let i = 0; i < formData.length; i++) {
        if (formData[i].value === "") {
          toast.error(`${formData[i].title} is not filled`);
          return;
        }
      }

      if(!imageFile) {
        toast.error("Please Upload the Image For the product!");
        return;
      }
      setIsLoading(true);

      const imageUrl = await uploadIageToCloudinary(imageFile);
      

      
  
      // Send to blockchain and get the ProductId
      const tempProductId = await handleBlockchainPost(imageUrl);
  
      if (!tempProductId) {
        throw new Error("Product not added to blockchain");
      }
  
      // Generate QR Code only if product was successfully added to blockchain
      const toastId = toast.loading("Generating QR...");
      const res = await axios.get(`/api/getqrcode/${tempProductId}`);
  
      if (res.data.msg === "success") {
        const link = document.createElement("a");
        link.href = res.data.qrCode;
        link.download = res.data.fileName;
        link.click();
        toast.success("QR downloaded", { id: toastId });
        close();
      } else {
        throw new Error(res.data.msg);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(error);
    }
  };
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <Theme grayColor="olive" appearance="dark">
      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-4xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl border border-white/10 shadow-2xl p-6 backdrop-blur-lg"
          >
            <div className="absolute top-4 right-4">
              <IconButton 
                variant="soft" 
                size="2" 
                onClick={close}
                className="hover:bg-white/10 rounded-full"
              >
                <Cross1Icon className="w-4 h-4" />
              </IconButton>
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
            >
              Add New Product
            </motion.h1>

            <div className="flex flex-col gap-8">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="flex justify-center"
              >
                <ImageUpload setImageFile={setImageFile} />
              </motion.div>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto scrollbar-hide p-2"
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              >
                {formData.map((item, key) => (
                  <motion.div
                    key={key}
                    variants={formItemVariants}
                    className="space-y-2 group"
                  >
                    <label className="text-sm font-medium text-gray-300">
                      {item.title}
                    </label>
                    <TextField.Root
                      size="3"
                      type={item.type}
                      placeholder={item.placeholder}
                      required
                      onChange={(e) => {
                        const updatedFormData = [...formData];
                        updatedFormData[key].value = e.target.value;
                        setFormData(updatedFormData);
                      }}
                      className="bg-white/5 hover:bg-white/10 focus:ring-2 focus:ring-blue-400/30 transition-all"
                    />
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex justify-between gap-4">
                <Button
                  variant="soft"
                  className="bg-white/5 hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-all"
                  onClick={() => setIsOpen(true)}
                >
                  ＋ Add Property
                </Button>
                <Button
                  size="3"
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8 py-3 rounded-lg font-semibold shadow-lg transition-all"
                  disabled={isLoading}
                  onClick={handleSubmit}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Submit Product"
                  )}
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                >
                  <motion.div
                    className="bg-gray-800/90 backdrop-blur-lg p-6 rounded-xl border border-white/10 w-full max-w-md"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Add New Property</h2>
                      <IconButton
                        variant="ghost"
                        onClick={() => setIsOpen(false)}
                        className="hover:bg-white/10 rounded-full"
                      >
                        <Cross1Icon className="w-4 h-4" />
                      </IconButton>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Property Title</label>
                        <TextField.Root
                          placeholder="eg: net weight"
                          size="3"
                          ref={titleRef}
                          className="bg-white/5 focus:ring-2 focus:ring-blue-400/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Field Type</label>
                        <Select.Root
                          value={selectedType}
                          onValueChange={setSelectedType}
                          size="3"
                        >
                          <Select.Trigger className="w-full bg-white/5 hover:bg-white/10" />
                          <Select.Content className="bg-gray-800 border border-white/10">
                            <Select.Item value="select" disabled>
                              Select field type
                            </Select.Item>
                            <Select.Item value="text">Text</Select.Item>
                            <Select.Item value="date" disabled>
                              Date
                            </Select.Item>
                            <Select.Item value="color" disabled>
                              Color
                            </Select.Item>
                          </Select.Content>
                        </Select.Root>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Sample Value</label>
                        <TextField.Root
                          placeholder="eg: 1.2kg"
                          size="3"
                          ref={valueRef}
                          className="bg-white/5 focus:ring-2 focus:ring-blue-400/30"
                        />
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                        onClick={handleAddProperty}
                      >
                        Add Property
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <Toaster position="top-center" />
    </Theme>
  );
};

export default AddProduct;