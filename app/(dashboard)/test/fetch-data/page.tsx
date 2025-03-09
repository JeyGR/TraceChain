"use client";

import { decryptData } from "@/utils/helper";
import { useDataStorageStore } from "@/utils/web3Fetch";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

const FetchData: React.FC = () => {
  const { fetchData } = useDataStorageStore();

  const [id, setId] = useState<string>("");
  const [data, setData] = useState<any>(null); // You can customize this type based on the data structure you expect.

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const web3Data = await fetchData(id);
    if (web3Data?.length) {
      const decryptedData = decryptData(web3Data);
      setData(decryptedData);
      console.log("web 3 data: ", decryptedData);
    } else {
      console.log("No Data found");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center text-black bg-white">
      <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Fetch Data</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700"
            >
              Unique ID:
            </label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>

        {data && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Fetched Data:</h3>
            <pre className="text-sm text-gray-800">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchData;
