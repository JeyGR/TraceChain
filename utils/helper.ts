/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoJS from "crypto-js";

const SECRET_KEY = "something";

export const encryptData = (data: Record<string, any>): string => {
  const jsonString = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
  return encrypted;
};

export const decryptData = (encryptedData: string): Record<string, any> => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedString);
};
