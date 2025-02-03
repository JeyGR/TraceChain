/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useRouter } from "next/navigation";

const QrScannerComp = ({
  setIsQrScannerOpen,
}: {
  setIsQrScannerOpen: (value: boolean) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [result, setResult] = useState<string>("");
  const router = useRouter();

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

  // Handle QR scan result
  const handleScanResult = (scannedResult: string) => {
    setResult(scannedResult);
    setIsQrScannerOpen(false);

    scannerRef.current?.stop();
    scannerRef.current?.destroy();
    scannerRef.current = null;

    router.push(`/user/${scannedResult}`);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const scannedResult = await QrScanner.scanImage(file);
        handleScanResult(scannedResult);
      } catch (error) {
        setResult("Failed to scan QR code. Please try again.");
        console.log("Error: ", error);
      }
    }
  };

  return (
    <div className="bg-gray-100 px-5 py-5 mx-3 md:px-10 md:py-10 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">QR Code Scanner</h2>

      <video ref={videoRef} className="w-full rounded-lg shadow-md" />

      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Upload QR Code
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="p-2 border rounded-md shadow-sm w-full cursor-pointer"
        />
      </div>

      {result && (
        <p className="mt-4 p-2 bg-white shadow-md rounded-md text-gray-800">
          Scanned Result: {result}
        </p>
      )}
    </div>
  );
};

export default QrScannerComp;
