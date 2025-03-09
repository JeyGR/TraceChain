"use client";
import { ReactNode, useState } from "react";
import Navbar from "./components/Navbar";
import QrScannerComp from "./components/QrScannerComp";

export default function UserLayout({ children }: { children: ReactNode }) {
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);


  return (
    <div className="bg-white h-fit text-black relative">
      <Navbar
        isQrScannerOpen={isQrScannerOpen}
        setIsQrScannerOpen={setIsQrScannerOpen}
      />
      {isQrScannerOpen && (
        <>
          <div
            onClick={() => setIsQrScannerOpen(!isQrScannerOpen)}
            className="absolute top-0 left-0 z-[99999] h-screen w-full bg-black opacity-40  text-black"
          ></div>
          <div className="absolute top-1/2 w-full md:w-fit left-1/2 -translate-x-1/2 -translate-y-1/2  z-[99999999]">
            <QrScannerComp setIsQrScannerOpen={setIsQrScannerOpen} />
          </div>
        </>
      )}

      {children}
    </div>
  );
}
