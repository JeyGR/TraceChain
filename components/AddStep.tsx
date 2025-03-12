/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Cross1Icon } from '@radix-ui/react-icons';
import { Button, Flex, IconButton, Select,  Theme } from '@radix-ui/themes';
import { Montserrat } from 'next/font/google';
import React, { useEffect, useState } from 'react'
import toast  from 'react-hot-toast';

import {useDataStorageStore} from "@/utils/web3Fetch"
import {  allUploadCloudinary, decryptAllData, decryptData, encryptData } from '@/utils/helper';
import { Loader2, UploadIcon } from 'lucide-react';

interface componentProp {
    close:()=>void,
    productId : string
}
const montserrat = Montserrat({subsets:['latin']});

const AddStep : React.FC<componentProp> = ({close, productId}) => {

  const {fetchProductDataWithId, addNewProcess, isLoading, fetchProcessWithId} = useDataStorageStore()

  const [isCreating, setIsCreating] = useState(false);
  const [isSelectingOption, setSelectingOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [currSelect, setCurrSelect] = useState("select");
  const [textTitle, setTextTitle] = useState("");
  const [textDescription, setTextDes] = useState("");
  const [props, setProps] = useState<{name:string, prop:string}[]>([{name: "Name", prop:"Sample"},
    {name: "Description", prop:"Description"},
    {name: "Maximum retail price", prop:"499"},
    {name: "Contact info", prop:"abc@gmail.com"},
    {name: "Net weight", prop:"1.2kg"},
    {name: "Country of origin", prop:"India"},
    {name: "Age restriction", prop:"Only for 16+"},])

  const [productImage, setProductImage] = useState<string | null>(null);
  const [process, setProcess] = useState<any>([]);


  const [image, setImage] =useState<[any] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [processImagesUrl, setProcessImagesUrl] = useState<any | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setImage([file]);
    }
  };

  const fetchProcessData = async()=> {
    try {
      const fetchProcess = await fetchProcessWithId(productId);
      if (!fetchProcess) {
        throw new Error("No response from process server");
      }
      const actualProcessData = await decryptAllData(fetchProcess);
      console.log("Actual Data: ", actualProcessData);
      setProcess(actualProcessData);

    } catch (error) {
      toast.error("No Process Found");
      console.log(error);
    }
  }


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetchProductDataWithId(productId);
          
          if (!response) {
            throw new Error("No response from product server");
          }   
          const actualData = decryptData(response);
          
    
          if (!actualData || actualData.length < 8) {
            throw new Error("Invalid or incomplete data received");
          }
          console.log("response data", actualData);
          
          
          setProps([
            { name: "Name", prop: actualData[0]?.value || "N/A" },
            { name: "Description", prop: actualData[1]?.value || "N/A" },
            { name: "Maximum retail price (₹)", prop: actualData[2]?.value || "N/A" },
            { name: "Contact info", prop: actualData[4]?.value || "N/A" },
            { name: "Net weight", prop: actualData[5]?.value || "N/A" },
            { name: "Country of origin", prop: actualData[6]?.value || "N/A" },
            { name: "Age restriction", prop: actualData[7]?.value || "N/A" },
          ]);

          if (actualData[8].value && Object.keys(actualData[8].value).length > 0) {
            setProductImage(actualData[8].value);
          }
          
          await fetchProcessData();
          
          
        } catch (error) {
          console.error("Error fetching product data:", error);
          setProps([{ name: "Error", prop: "Failed to load product details" }]);
          toast.error("Try Again")
        }
      };
    
      fetchData();
    }, []); 
    

  const handleAddProduct = ()=>{
    setIsCreating(true);
    setSelectingOption(true);
  }

  const handleSelectedType = ()=>{
    console.log("Field type selected");
    if(currSelect==="select"){
      toast.error("Select an option");
      return;
    }
    setSelectedOption(currSelect);
    setSelectingOption(false);
    setCurrSelect("select");
  }
  
  const handleSubmitClicked = async ()=>{
    console.log("New field created");
    if(((selectedOption==="text") && (textTitle==="" || textDescription==="")) || ((selectedOption==="image") && textTitle==="")){
      toast.error("All fields are to be filled!");
      return;
    }
    setTextTitle("");
    setTextDes("");
    if(selectedOption === "image") {
      setLoading(true);
      const uploadedProcessImages =  await allUploadCloudinary(image);
      setProcessImagesUrl(uploadedProcessImages);
      const newProcess = {
        id: productId,
        title: textTitle,
        images: uploadedProcessImages,
      };

      const encryptedData = encryptData(newProcess);
      const response = await addNewProcess(productId, encryptedData);
   
      if(response) {
        setProcess([...process, {images: uploadedProcessImages, title: textTitle}]);
        setIsCreating(false);
       }

       setLoading(false);
    } else if (selectedOption === "text") {
      const newProcess = {
        id: productId,
        title: textTitle,
        description: textDescription
      };

      const encryptedData = encryptData(newProcess);
     const response = await addNewProcess(productId, encryptedData);
     if(response) {
      setProcess([...process, {title: textTitle, description: textDescription}]);
      setIsCreating(false);
     }
    }
  }

  return (
    <Theme appearance="dark">
  <div className={`fixed inset-0 bg-black/80 flex justify-center items-center p-4 sm:p-8 ${montserrat.className}`}>
    <div className="relative bg-gray-800/90 backdrop-blur-xl border border-gray-600/30 w-full max-w-4xl max-h-[90vh] rounded-xl flex flex-col overflow-hidden">
      <div className="p-6 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-100">Product Process Tracking</h2>
        <IconButton variant="ghost" onClick={close} className="text-gray-400 hover:text-white">
          <Cross1Icon className="w-5 h-5" />
        </IconButton>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Product Overview Section */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {productImage ? (
              <img 
                src={productImage} 
                alt="Product" 
                className="w-full md:w-64 h-64 object-contain rounded-lg border border-gray-700/50 bg-gray-900/20"
              />

            ) : (
              <div className="">No Image Found</div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
              {props.map((item, index) => (
                <div key={index} className="p-4 bg-gray-900/20 rounded-lg border border-gray-700/30">
                  <p className="text-sm font-medium text-gray-400">{item.name}</p>
                  <p className="text-gray-200 font-semibold truncate">{item.prop}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Existing Processes Section */}
        {process.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Production Steps</h3>
            <div className="grid gap-4">
              {process.map((item: any, index: number) => (
                <ProcessItem key={index} data={item} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Add Process Section */}
        {!isCreating && (
          <div className="flex justify-center">
            <Button 
              size="3" 
              variant="soft" 
              className="w-full max-w-md bg-indigo-900/30 hover:bg-indigo-800/40 border border-dashed border-indigo-500/40"
              onClick={handleAddProduct}
            >
              + Add New Process Step
            </Button>
          </div>
        )}

        {/* Process Creation Interface */}
        {isCreating && (
          <div className="bg-gray-900/20 border border-gray-700/30 rounded-xl p-6 space-y-6">
            {isSelectingOption ? (
              <div className="space-y-4">
                <h4 className="text-gray-300 font-medium">Select Step Type</h4>
                <Flex gap="4" align="center">
                  <Select.Root value={currSelect} onValueChange={setCurrSelect} size="3">
                    <Select.Trigger className="w-full" />
                    <Select.Content>
                      <Select.Item value="text">Text Description</Select.Item>
                      <Select.Item value="image">Image Documentation</Select.Item>
                    </Select.Content>
                  </Select.Root>
                  <Button variant="solid" onClick={handleSelectedType}>
                    Continue
                  </Button>
                </Flex>
              </div>
            ) : (
              <div className="space-y-6">
                <h4 className="text-gray-300 font-medium">
                  Add {selectedOption === 'text' ? 'Text' : 'Image'} Step
                </h4>

                {selectedOption === 'text' ? (
                  <div className="space-y-4">
                    <TextField
                      label="Step Title"
                      placeholder="Raw Material Acquisition"
                      value={textTitle}
                      onChange={setTextTitle}
                      required
                    />
                    <TextField
                      label="Step Description"
                      placeholder="Sourced organic cotton from certified local farmers..."
                      value={textDescription}
                      onChange={setTextDes}
                      multiline
                      required
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <TextField
                      label="Step Title"
                      placeholder="Quality Inspection"
                      value={textTitle}
                      onChange={setTextTitle}
                      required
                    />
                    <FileUpload 
                      onFileChange={handleImageChange}
                      isUploading={loading}
                    />
                  </div>
                )}

                <Flex gap="3" justify="end">
                  <Button variant="soft" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                  <Button 
                    variant="solid" 
                    onClick={handleSubmitClicked}
                    disabled={loading || isLoading}
                  >
                    {loading ? <Loader2 className="animate-spin" /> : 'Save Step'}
                  </Button>
                </Flex>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  </div>
</Theme>
  );
}

// Process Item Component
const ProcessItem = ({ data, index }: { data: any; index: number }) => (
  <div className="group relative bg-gray-900/20 border border-gray-700/30 rounded-lg p-4 hover:border-gray-600/50 transition-colors">
    <span className="absolute -left-3 -top-3 bg-indigo-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
      {index + 1}
    </span>
    {data.description ? (
      <div>
        <h4 className="text-gray-200 font-medium mb-2">{data.title}</h4>
        <p className="text-gray-400 text-sm">{data.description}</p>
      </div>
    ) : (
      <div>
        <h4 className="text-gray-200 font-medium mb-3">{data.title}</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {data.images?.map((img: string, i: number) => (
            <div key={i} className="aspect-square relative rounded-lg overflow-hidden border border-gray-700/40">
              <img
                src={img}
                alt={`Process step ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
}

// Text Field Component
const TextField = ({ label, value, onChange, placeholder, required, multiline = false } : TextFieldProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-400">
      {label}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 bg-gray-900/30 border border-gray-700/40 rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all"
        rows={4}
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 bg-gray-900/30 border border-gray-700/40 rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all"
      />
    )}
  </div>
);

// File Upload Component
const FileUpload = ({ onFileChange, isUploading } : {onFileChange: any; isUploading: boolean}) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-400">Upload Images</label>
    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-700/40 rounded-lg bg-gray-900/30 hover:border-indigo-500/50 transition-colors cursor-pointer">
      <input type="file" multiple className="hidden" onChange={onFileChange} />
      <div className="text-center p-4">
        <div className="text-gray-400 mb-2">
          {isUploading ? (
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
          ) : (
            <>
              <UploadIcon className="w-6 h-6 mx-auto mb-2" />
              <span className="block">Drag & drop or click to upload</span>
              <span className="text-xs text-gray-500">Supports: PNG, JPG, JPEG</span>
            </>
          )}
        </div>
      </div>
    </label>
  </div>
);

export default AddStep