/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, UploadCloud,  CheckCircle2, AlertCircle, X } from "lucide-react";

const QrScannerComp = ({
  setIsQrScannerOpen,
}: {
  setIsQrScannerOpen: (value: boolean) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      scannerRef.current = new QrScanner(
        videoRef.current,
        (result) => handleScanResult(result.data),
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
          maxScansPerSecond: 5,
        }
      );

      scannerRef.current.start()
        .then(() => setLoading(false))
        .catch((err) => {
          setError("Camera access denied. Please enable camera permissions.");
          console.log(err);
          
          setLoading(false);
        });
    }

    return () => {
      scannerRef.current?.stop();
      scannerRef.current?.destroy();
      scannerRef.current = null;
    };
  }, []);

  const handleScanResult = (scannedResult: string) => {
    setResult(scannedResult);
    setRedirecting(true);

    setTimeout(() => {
      scannerRef.current?.stop();
      setIsQrScannerOpen(false);
      router.push(`/user/${scannedResult}`);
    }, 1500);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setLoading(true);
        const scannedResult = await QrScanner.scanImage(file);
        handleScanResult(scannedResult);
      } catch (error) {
        setError("Failed to scan QR code. Please try again.");
        console.error("Scan error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="bg-white px-6 py-8 rounded-2xl shadow-2xl max-w-md w-full mx-3 relative"
    >
      <div className="mb-6 text-center">
        <motion.h2 
          className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
          initial={{ y: -10 }}
          animate={{ y: 0 }}
        >
          Scan QR Code
        </motion.h2>
        <p className="text-gray-500">Scan food product QR code to verify authenticity</p>
      </div>

      <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden border-4 border-emerald-50">
        {redirecting ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90">
            <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
            <p className="text-emerald-700 font-medium">
              Fetching product details...
            </p>
          </div>
        ) : (
          <>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
              </div>
            )}

            {error ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 p-4 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            ) : (
              <video ref={videoRef} className="w-full h-full object-cover" />
            )}
          </>
        )}
      </div>

      <div className="mt-6">
        <label className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-emerald-100 rounded-xl hover:bg-emerald-50 transition-colors cursor-pointer">
          <UploadCloud className="w-8 h-8 text-emerald-600" />
          <span className="text-emerald-700 font-medium">Upload QR Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-emerald-50 rounded-lg flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700">Scanned successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsQrScannerOpen(false)}
        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="w-6 h-6 text-gray-500" />
      </button>
    </motion.div>
  );
};

export default QrScannerComp;