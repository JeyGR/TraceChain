/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState } from "react";
import { encryptData } from "@/utils/helper";
import { useDataStorageStore } from "@/utils/web3Fetch";

type FormData = {
  id: string;
  username: string;
  email: string;
  age: string;
};

const NewForm = () => {
  const { addOrUpdateData } = useDataStorageStore();

  const [formData, setFormData] = useState<FormData>({
    id: "",
    username: "",
    email: "",
    age: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    const hashString = encryptData({
      username: formData.username,
      email: formData.email,
      age: formData.age,
    });

    const hashedData = {
      id: formData.id,
      hashString,
    };

    await addOrUpdateData(formData.id, hashString);

    console.log("Hashed Data: ", hashedData);
  };

  return (
    <div className="flex text-black justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-4">User Form</h2>

        <label className="block mb-2">Unique ID:</label>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-4"
          required
        />

        <label className="block mb-2">Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-4"
          required
        />

        <label className="block mb-2">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-4"
          required
        />

        <label className="block mb-2">Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewForm;
