/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import "@radix-ui/themes/styles.css";
import { Montserrat } from "next/font/google";
import React, { useEffect, useState } from "react";
import { PlusIcon, EnterFullScreenIcon } from "@radix-ui/react-icons";
import AddProduct from "@/components/AddProduct";
import AddStep from "@/components/AddStep";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProductScanner from "@/components/ProductScanner";
import DisplayProduct from "./_components/DisplayProduct";
import { motion, AnimatePresence } from "framer-motion";
import { useDataStorageStore } from "@/utils/web3Fetch";
import { attachIdToProductData, decryptAllProductData } from "@/utils/helper";
import { ExitIcon } from "@radix-ui/react-icons";

const montserrat = Montserrat({ subsets: ["latin"] });

const Home = () => {

  const handleLogout = () => {
    localStorage.removeItem("offToken");
    toast.success("Logged out successfully");
    router.push("/signin");
  };


  const { initializeWeb3, getAllProductData } = useDataStorageStore();

  const [allProductData, setAllProductData] = useState<any>([]);
  const [products, setProducts] = useState([]);
  const [isAddProductModal, setIsAddProductModal] = useState(false);
  const [isScanerModal, setIsScannerModal] = useState<boolean>(false);
  const [isAddStepModalOpen, setIsAddStepModalOpen] = useState<boolean>(false);
  const [qrCode,setQRCode] = useState<string>("");
  const [authorityDetails, setAuthorityDetails] = useState<{
    name: string;
    email: string;
    desig: string;
  }>({
    name: "",
    email: "",
    desig: "",
  });
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  useEffect(()=>{
    const receiveData = async ()=>{
      try {
        const response = await axios.get("/api/getoffdetails", {headers:{token: localStorage.getItem("offToken")}});
        if(response.data.msg==="success"){
          const temp = {
            name: response.data.data.name,
            email: response.data.data.email,
            desig : "Something"
          }
          setAuthorityDetails(temp);
        }
        else{
          localStorage.removeItem("offToken");
          toast.error("Session expired");
          router.push("/signin");
        }
        return;
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
    receiveData();
  },[])

   useEffect(()=> {
      const fetchData = async () => {
        const initialize = await initializeWeb3();
  
        if(initialize === "success") {
          const response = await getAllProductData();
          const decryptedData = await decryptAllProductData(response[1]);
          const newArrayProduct = (await attachIdToProductData(decryptedData, response[0])).reverse();
          setAllProductData(newArrayProduct);
          
        } 
      };
      fetchData();
    },[])



  const handleAddProductModalClose = () => {
    setIsAddProductModal(false);
  };

  const handleAddStepModalTrigger =(qrCode : string)=>{
    
    setQRCode(qrCode);
    setIsAddStepModalOpen(true);
  }



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 flex flex-col md:flex-row ${montserrat.className}`}
    >
      {/* Sidebar */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="md:w-96 w-full min-h-screen p-6 bg-black/30 backdrop-blur-lg border-r border-white/10 shadow-2xl"
      >
        <motion.h1 variants={itemVariants} className="text-2xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
          My Profile
        </motion.h1>

        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-300">Details</h2>
          <div className="space-y-4 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Name</p>
              <p className="font-medium text-gray-200">{authorityDetails.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Email</p>
              <p className="font-medium text-gray-200">{authorityDetails.email}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Designation</p>
              <p className="font-medium text-gray-200">{authorityDetails.desig}</p>
            </div>
          </div>
            <motion.div variants={itemVariants} className="mt-6">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleLogout}
                className="w-full py-3 px-6 bg-gradient-to-r from-red-600 to-rose-600 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-red-500/20 transition-all"
              >
                <ExitIcon className="w-5 h-5" />
                <span className="text-sm font-semibold">Log Out</span>
              </motion.button>
            </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold mb-4 text-gray-300">Recently Added</h2>
          <div className="space-y-4">
          {products.length === 0 ? (
            <div className="relative space-y-4 h-[50vh] overflow-y-auto">
              {/* Scrollable content with hidden scrollbar */}
              <div className="pr-4 space-y-4 scrollbar-hide 
                [-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                hover:scrollbar-thin scrollbar-track-transparent scrollbar-thumb-emerald-500/20
                transition-all duration-300">
                {allProductData?.map((data: any, index:number) => {
                  if(Object.keys(data).length >=9) {

                    const imageSrc =
                      Object.keys(data).length >= 9 &&
                      data[8]?.title === "Product Image" &&
                      typeof data[8]?.value === "string" &&
                      data[8]?.value.trim() !== ""
                        ? data[8].value
                        : null; 

                    return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <DisplayProduct
                        productId={data?.productId}
                        handleAddStepOpen={handleAddStepModalTrigger}
                        imageUrl={imageSrc}
                        productName={data[0]?.value}
                        email={data[4]?.value}
                        country={data[6]?.value}
                        className=""
                      />
                    </motion.div>
                  )
                  }
                })}
              </div>
              
              {/* Gradient overlay */}
              <div className="sticky bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none"></div>
            </div>
          ) : (
            <div>{/* product catalog */}</div>
          )}
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex items-center justify-center p-6"
      >
        <div className="flex flex-col gap-8 w-full max-w-md">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => setIsAddProductModal(true)}
          >
            <PlusIcon className="w-6 h-6" />
            <span className="text-lg font-semibold">Add New Product</span>
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => setIsScannerModal(true)}
          >
            <EnterFullScreenIcon className="w-6 h-6" />
            <span className="text-lg font-semibold">Scan Product</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {isAddProductModal && (
          <AddProduct setAllProductData={setAllProductData} allProductData={allProductData} close={handleAddProductModalClose} />
        )}

        {isScanerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-2xl bg-black/80 rounded-2xl border border-white/10 p-6 shadow-2xl">
                <ProductScanner
                  setIsQrScannerOpen={() => setIsScannerModal(false)}
                  handleScanned={handleAddStepModalTrigger}
                />
              </div>
            </motion.div>
          </motion.div>
        )}

        {isAddStepModalOpen && (
          <AddStep close={() => setIsAddStepModalOpen(false)} productId={qrCode} />
        )}
      </AnimatePresence>

      <Toaster position="top-right" />
    </motion.div>
  );
};

export default Home;
