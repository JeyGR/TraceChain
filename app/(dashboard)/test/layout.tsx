"use client";

import { useDataStorageStore } from "@/utils/web3Fetch";
import { ReactNode, useEffect } from "react";

const TestingLayout = ({ children }: { children: ReactNode }) => {
  const { initializeWeb3 } = useDataStorageStore();

  useEffect(() => {
    const connectWeb3 = async () => {
      await initializeWeb3();
    };
    connectWeb3();
  }, []);

  return <div className="">{children}</div>;
};

export default TestingLayout;
