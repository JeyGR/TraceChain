/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoJS from "crypto-js";

import {customAlphabet} from "nanoid"

const SECRET_KEY = "something";

export const encryptData = (data: Record<string, any>): string => {
  console.log("data: ", data);

  const jsonString = JSON.stringify(data, (_, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

  const encrypted = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
  return encrypted;
};

export const decryptData = (encryptedData: string): Record<string, any> => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedString);
};

export const isLoggedIn = (): boolean => {
  const token = localStorage.getItem('token');
  return token !== null;
};


export const createUniqueId  = ()=> {
  const generateNumbericId = customAlphabet("0123456789", 20);
  const uniqueId = generateNumbericId();
  return uniqueId;
}



export const uploadIageToCloudinary = async(image:File |null)=>{
  if (!image) return alert("Please select an image first");
    const formData = new FormData();
    formData.append("file",image);
    formData.append("upload_preset", "image for project"); 
    formData.append("cloud_name", "db4dvxdki");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/db4dvxdki/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;

    } catch(err) {
      console.log(err);
      return null;
    }

}


export const decryptAllData = async(datas:any)=> {
  let newArray:any = [];
  for(const data of datas) {
    const dataOfHash = decryptData(data.processHash);
    newArray = [...newArray, dataOfHash];
  }
  return newArray;  
}

export const decryptAllProductData = async(datas:any)=> {
  let newArray:any = [];
  for(const data of datas) {
    const dataOfHash = decryptData(data);
    newArray = [...newArray, dataOfHash];
  }
  return newArray;  
}


export const allUploadCloudinary = async (images: any[] | null) => {
  if (!images) return images;
  const imagesUrl = [];
  for (const img of images) {
    for (const key in img) {
      if (Object.prototype.hasOwnProperty.call(img, key)) {
        const uploadImage = await uploadIageToCloudinary(img[key]);
        imagesUrl.push(uploadImage);
      }
    }
  }
  console.log(imagesUrl);
  return imagesUrl;
};


export const attachIdToProductData = async (productArray: any[], idArray: any[]) => {

  for(let i=0;i<idArray.length;i++) {
    
    productArray[i] = {...productArray[i],  productId:idArray[i]};
  }
  return productArray;

}