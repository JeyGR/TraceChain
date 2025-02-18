"use client";
import "@radix-ui/themes/styles.css";
import { Montserrat } from "next/font/google";
import React, { useEffect, useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { EnterFullScreenIcon } from "@radix-ui/react-icons";
import AddProduct from "@/components/AddProduct";
import AddStep from "@/components/AddStep";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProductScanner from "@/components/ProductScanner";

const montserrat = Montserrat({ subsets: ["latin"] });

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isAddProductModal, setiIsAddProductModal] = useState(false);
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

  useEffect(()=>{
    const receiveData = async ()=>{
      try {
        const response = await axios.get("/api/getoffdetails", {headers:{token: localStorage.getItem("offToken")}});
        if(response.data.msg==="success"){
          console.log(response.data);
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

  const handleAddProductModalClose = () => {
    setiIsAddProductModal(false);
  };

  const handleAddStepModalTrigger =(qrCode : string)=>{
    setQRCode(qrCode);
    setIsAddStepModalOpen(true);
  }



  return (
    <div
      className={`max-w-screen w-full min-h-screen bg-neutral-900 flex justify-between items-center ${montserrat.className}`}
    >
      <div className="md:w-1/4 min-h-screen p-5 border-r-2 border-r-neutral-800 hidden md:flex flex-col items-center gap-7">
        <h1 className="text-bold text-2xl font-extrabold">My profile</h1>
        <div className="w-full flex flex-col gap-1">
          <h1 className="text-xl font-bold">Details </h1>
          <div className="w-full bg-neutral-400 bg-opacity-30 rounded-lg flex flex-col gap-5 px-1 md:px-3 py-2 border-2 border-opacity-10 border-neutral-100">
            <h1 className="font-bold">
              Name :{" "}
              <span className="font-medium">{authorityDetails.name}</span>
            </h1>
            <h1 className="font-bold">
              Email :{" "}
              <span className="font-medium">{authorityDetails.email}</span>
            </h1>
            <h1 className="font-bold">
              Designation :{" "}
              <span className="font-medium">{authorityDetails.desig}</span>
            </h1>
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <h1 className="text-xl font-bold">Products </h1>
          <div>
            <div className="w-full bg-neutral-400 bg-opacity-30 rounded-lg flex flex-col gap-5 px-1 md:px-3 py-2 border-2 border-opacity-10 border-neutral-100">
              {products.length === 0 ? (
                <div className="text-sm font-normal text-blue-500">
                  No products found!
                </div>
              ) : (
                <div>{/* product catalog goes here */}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-3/4 w-full min-h-screen flex flex-col p-5 items-center justify-center">
        <div className=" p-5 rounded-lg flex flex-col gap-5 items-center">
          <button
            className="px-8 py-1 bg-blue-600 rounded text-xl font-semibold flex items-center gap-3 hover:bg-blue-800"
            onClick={() => setiIsAddProductModal(true)}
          >
            <PlusIcon className="w-6 h-6" />
            Add new
          </button>
          <button
            className="px-8 py-1 bg-blue-600 rounded text-xl font-semibold flex items-center gap-3 hover:bg-blue-800"
            onClick={() => setIsScannerModal(true)}
          >
            <EnterFullScreenIcon className="w-6 h-6" />
            Scan
          </button>
        </div>
      </div>
      {isAddProductModal && <AddProduct close={handleAddProductModalClose} />}
      {isScanerModal && (
        <div>
          <div
            onClick={() => setIsScannerModal(false)}
            className="absolute top-0 left-0 z-[99999] h-screen w-full bg-black opacity-80  text-black"
          ></div>
          <div className="absolute top-1/2 w-full md:w-fit left-1/2 -translate-x-1/2 -translate-y-1/2  z-[99999999]">
            <ProductScanner
              setIsQrScannerOpen={()=>setIsScannerModal(false)} handleScanned={handleAddStepModalTrigger}
            />
          </div>
        </div>
      )}
      <Toaster />
      {isAddStepModalOpen && (
        <AddStep close={()=>setIsAddStepModalOpen(false)} productId={qrCode}/>
      )}
    </div>
  );
};

export default Home;
