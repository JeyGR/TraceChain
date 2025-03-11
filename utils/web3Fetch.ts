/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import Web3 from "web3";
import DataStorageABI from "./DataStorage.json";
import ProcessDataABI from "./ProcessStorage.json";

interface DataStorageStore {
  web3: Web3 | null;
  productContract: any | null;
  processContract: any | null;
  productAccount: string | null;
  processAccount: string| null;
  account:string|null;
  isLoading: boolean;
  error: string | null;
  initializeWeb3: () => Promise<string | void>;
  addNewProduct: (id:string, hashString:string)=> Promise<string | undefined>;
  fetchProductDataWithId: (id:string | string [])=> Promise<any>;
  addNewProcess: (id:string, processHash:string)=> Promise<string | undefined>;
  fetchProcessWithId: (id:string | string[])=> Promise<any>;
  getAllProductData: () => Promise<any>;
}

export const useDataStorageStore = create<DataStorageStore>((set, get) => ({
  web3: null,
  productContract:null,
  processContract: null,
  productAccount: null,
  processAccount: null,
  isLoading: false,
  error: null,
  account:null,

  // Initialize Web3 and the contract
  initializeWeb3: async () => {
    set({ isLoading: true, error: null });
    try {
      const web3 = new Web3("http://127.0.0.1:7545");

      const productContract = new web3.eth.Contract(
        DataStorageABI.abi, "0x5bAb7b1D78C598cad7D2580cB1cDC721c44e50a2",
      );
      
      const processContract = new web3.eth.Contract(
        ProcessDataABI.abi, "0x92Ed1c693a24CCc8065F9D101dbb6a4Fc19d0261",
      );

      const accounts = await web3.eth.getAccounts();
      set({ web3, productContract, processContract, isLoading: false, account:accounts[2] });
      console.log("Web3 initialized successfully");
      return "success";
    } catch (error) {
      console.error("Error initializing Web3:", error);
      set({ error: "Failed to initialize Web3", isLoading: false });
    }
  },

  addNewProduct: async(id:string, hashString:string)=> {
    const { productContract, web3 ,account} = get();
    if (!web3 || !account || !productContract) {
          console.error("Web3 or contract is not initialized");
          set({ error: "Web3 or contract is not initialized" });
          return;
    }

    set({ isLoading: true, error: null });

    try {
       await productContract.methods
        .addOrUpdateData(id, hashString)
        .send({ from: account, gas: 3000000 });
      

      set({ isLoading: false });
      console.log("Data added/updated successfully");
      return id;
    } catch (error) {
      console.error("Error adding/updating data:", error);
      set({ error: "Failed to add/update data", isLoading: false });  
    }
  },


  fetchProductDataWithId: async(id:string | string[])=> {
    
    const { productContract, web3 ,account} = get();
    if (!web3 || !account || !productContract) {
          console.error("Web3 or contract is not initialized");
          set({ error: "Web3 or contract is not initialized" });
          return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await productContract.methods.getData(id).call();
      set({ isLoading: false });
      console.log("Data successfully fetched");
      return response;
    } catch (error) {
      console.error("Error Fetching Product Data with product Id:", error);
      set({ error: "Error Fetching Product Data with product Id:", isLoading: false });  
    }
  },

  addNewProcess: async(id:string, processHash:string)=> {
    const {processContract, web3, account} = get();
    if (!web3 || !account || !processContract) {
      console.error("Web3 or contract is not initialized");
      set({ error: "Web3 or contract is not initialized" });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      await processContract.methods.storeProcess(id, processHash).send({ from: account, gas: 3000000});
      set({ isLoading: false });
      console.log("Process data added/updated successfully");
      return id;
    } catch (error) {
      console.error("Error adding/updating process data:", error);
      set({ error: "Failed to add/update process data", isLoading: false }); 
    }
  },

  fetchProcessWithId: async(id:string | string[])=> {
    const {processContract, web3, account} = get();
    if (!web3 || !account || !processContract) {
      console.error("Web3 or contract is not initialized");
      set({ error: "Web3 or contract is not initialized" });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await processContract.methods.getProcesses(id).call();
      set({isLoading: false});
      
      console.log("Process Data  successfully fetched");
      return response;

    } catch (error) {
      console.log("Error Fetching Process Data with process Id: ", error);
      set({ error: "Error Fetching Process Data with process Id:", isLoading: false }); 
    }

  },

  getAllProductData: async () => {
    const {productContract, web3, account} = get();
    if (!web3 || !account || !productContract) {
      console.error("Web3 or contract is not initialized");
      set({ error: "Web3 or contract is not initialized" });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await productContract.methods.getAllData().call();
      set({isLoading:false});
      console.log("Successfully fetched all product data");
      return response;
    } catch (error) {
      console.error("Error Fetching All product Data", error);
      set({ error: "Error Fetching All product Data", isLoading: false }); 
    }
  }


}));
