/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import Web3 from "web3";
import DataStorageABI from "./DataStorage.json";

interface DataStorageStore {
  web3: Web3 | null;
  contract: any | null;
  account: string | null;
  isLoading: boolean;
  error: string | null;
  initializeWeb3: () => Promise<void>;
  addOrUpdateData: (id: string, hashString: string) => Promise<void>;
  fetchData: (id: string) => Promise<string | null>;
}

export const useDataStorageStore = create<DataStorageStore>((set, get) => ({
  web3: null,
  contract: null,
  account: null,
  isLoading: false,
  error: null,

  // Initialize Web3 and the contract
  initializeWeb3: async () => {
    set({ isLoading: true, error: null });
    try {
      const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
      const contractAddress = "0xe4cE70Dd3A5Ad376C5a6BC75F1d18d9c22FD7539";
      const contract = new web3.eth.Contract(
        DataStorageABI.abi,
        contractAddress
      );
      const accounts = await web3.eth.getAccounts();

      set({ web3, contract, account: accounts[0], isLoading: false });
      console.log("Web3 initialized successfully");
    } catch (error) {
      console.error("Error initializing Web3:", error);
      set({ error: "Failed to initialize Web3", isLoading: false });
    }
  },

  // Add or update data in the contract
  addOrUpdateData: async (id: string, hashString: string) => {
    const { web3, contract, account } = get();
    if (!web3 || !contract || !account) {
      console.error("Web3 or contract is not initialized");
      set({ error: "Web3 or contract is not initialized" });
      return;
    }
    const gasLimit = 3000000;

    set({ isLoading: true, error: null });
    try {
      await contract.methods
        .addOrUpdateData(id, hashString)
        .send({ from: account, gas: gasLimit });

      console.log("Data added/updated successfully");
      set({ isLoading: false });
    } catch (error) {
      console.error("Error adding/updating data:", error);
      set({ error: "Failed to add/update data", isLoading: false });
    }
  },

  // Fetch data from the contract
  fetchData: async (id: string): Promise<string | null> => {
    const { contract } = get();
    if (!contract) {
      console.error("Contract is not initialized");
      set({ error: "Contract is not initialized" });
      return null;
    }

    set({ isLoading: true, error: null });
    try {
      const hashString = await contract.methods.getData(id).call();
      console.log("Fetched Data:", hashString);
      set({ isLoading: false });
      return hashString;
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ error: "Failed to fetch data", isLoading: false });
      return null;
    }
  },
}));
