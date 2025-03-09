"use client";

import React, { ReactNode, useEffect } from 'react'

import {useDataStorageStore} from "@/utils/web3Fetch"

const DashBoardLayout = ({children}: {children:ReactNode}) => {
    const  {initializeWeb3} = useDataStorageStore();

    useEffect(()=> {
        const initalize = async ()=> {
            await initializeWeb3();
        };
        initalize();
      }, []);

  return (
    <div>{children}</div>
  )
}

export default DashBoardLayout;