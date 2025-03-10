/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import toast, { Toaster } from "react-hot-toast";


interface ProductScannerprops {
    setIsQrScannerOpen : ()=>void,
    handleScanned : (QRID : string)=>void,
}

const ProductScanner = ({setIsQrScannerOpen, handleScanned} : ProductScannerprops) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [qrCode, setQrcode] = useState<string>("");

  useEffect(() => {
    if (videoRef.current) {
      scannerRef.current = new QrScanner(
        videoRef.current,
        (result) => handleScanResult(result.data),
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );
      scannerRef.current.start();
    }

    return () => {
      scannerRef.current?.stop();
      scannerRef.current?.destroy();
      scannerRef.current = null;
    };
  }, []);

  const handleScanResult = async (scannedResult: string) => {
    setQrcode(scannedResult);
    scannerRef.current?.stop();
    scannerRef.current?.destroy();
    scannerRef.current = null;
    if(scannedResult==="Error"){
        toast.error("Coudln't scan QR, try again later");
    }
    else if(scannedResult===""){
        toast.error("Unexpected error occured")
    }
    else{
        setIsQrScannerOpen();
        handleScanned(scannedResult);
    }
  };
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("mnvjgfh");
    const file = event.target.files?.[0];
    if (file) {
      try {
        const scannedResult = await QrScanner.scanImage(file);
        handleScanResult(scannedResult);
      } catch (error) {
        handleScanResult("Error");
        console.log("Error: ", error);
      }
    }
  };

  return (
    <div className="bg-neutral-700 bg-opacity-40 backdrop-blur px-5 py-5 mx-3 md:px-10 md:py-10 rounded-lg shadow-xl border border-neutral-400 border-opacity-25">
      
      <h2 className="text-2xl font-bold mb-4">QR Code Scanner</h2>

      <video ref={videoRef} className="w-full rounded-lg shadow-md" />

      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-white">
          Upload QR Code
        </label>
        <input
          type="file"
          onChange={handleFileUpload}
          className="p-2 border border-neutral-300 border-opacity-25 rounded-md shadow-sm w-full cursor-pointer"
        />
      </div>
    <Toaster/>
    </div>
  );
};

export default ProductScanner;
