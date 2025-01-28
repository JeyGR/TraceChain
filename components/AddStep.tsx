"use client";
import { Cross1Icon } from '@radix-ui/react-icons';
import { Button, Flex, IconButton, Select, Theme } from '@radix-ui/themes';
import { Montserrat } from 'next/font/google';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

interface componentProp {
    close:()=>void;
}
const montserrat = Montserrat({subsets:['latin']});

const AddStep : React.FC<componentProp> = ({close}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isSelectingOption, setSelectingOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [currSelect, setCurrSelect] = useState("select");
  const [textTitle, setTextTitle] = useState("");
  const [textDescription, setTextDes] = useState("");

  const handleAddProduct = ()=>{
    console.log("Add product");
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
  
  const handleSubmitClicked = ()=>{
    console.log("New field created");
    if(((selectedOption==="text") && (textTitle==="" || textDescription==="")) || ((selectedOption==="image") && textTitle==="")){
      toast.error("All fields are to be filled!")
      return;
    }
    setIsCreating(false);
    setTextTitle("");
    setTextDes("");
  }


    const props = [
        {name: "Name", prop:"Sample"},
        {name: "Description", prop:"Description"},
        {name: "Maximum retail price", prop:"499"},
        {name: "Contact info", prop:"abc@gmail.com"},
        {name: "Net weight", prop:"1.2kg"},
        {name: "Country of origin", prop:"India"},
        {name: "Age restriction", prop:"Only for 16+"},
    ]

  return (
    <Theme appearance="dark">
      <div
        className={`fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-8 lg:p-32 ${montserrat.className}`}
      >
        <div className="bg-neutral-700 bg-opacity-70 backdrop-blur-md border-2 border-opacity-30 border-neutral-400 flex flex-col gap-5 w-full h-full rounded-lg  md:py-10 md:px-5 lg:p-10 py-10 px-2">
          <div className="w-full min-h-8 rounded bg-neutral-600 border-2  bg-opacity-35 backdrop-blur-lg border-opacity-25 border-neutral-400 flex flex-col gap-3 p-5">
            <div className="w-full text-center pb-4 border-b-2 border-neutral-400 border-opacity-30">
              <h1 className="text-xl font-bold">Product</h1>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {props.map((item, key) => (
                <h1 className="text-lg font-semibold text-white" key={key}>
                  {item.name} :{" "}
                  <span className="font-light text-neutral-200">
                    {item.prop}
                  </span>
                </h1>
              ))}
            </div>
          </div>
          {!isCreating && (
            <div className="w-full flex justify-center">
              <button
                className="py-2 px-8 rounded bg-indigo-950 bg-opacity-45 hover:bg-indigo-800 border-2 border-opacity-45 border-indigo-400 font-medium border-dashed hover:border-indigo-400 hover:border-opacity-0"
                onClick={handleAddProduct}
              >
                Add a new process
              </button>
            </div>
          )}
          {isSelectingOption && (
            <Flex align="center" justify="center" gap="5">
              <Select.Root
                value={currSelect}
                onValueChange={setCurrSelect}
                size="3"
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="select" disabled>
                    Select a type
                  </Select.Item>
                  <Select.Item value="text">Text field</Select.Item>
                  <Select.Item value="image">Image</Select.Item>
                </Select.Content>
              </Select.Root>
              <Button variant="solid" size="3" onClick={handleSelectedType}>
                Submit
              </Button>
            </Flex>
          )}
          {isCreating && !isSelectingOption && (
            <div className='border-2 border-opacity-35 border-neutral-100 p-3 rounded-lg border-dashed'>
              {selectedOption === "text" ? (
                <div className="flex gap-4 items-end w-full">
                  <div className='space-y-1'>
                    <h1 className='font-medium'>Segment title</h1>
                  <input
                    type="text"
                    className="py-2 px-8 rounded border-2 border-neutral-600 focus:border-neutral-400 focus:outline-none bg-neutral-700 bg-opacity-45 font-medium"
                    placeholder="eg : Raw materials import"
                    onChange={(e)=>setTextTitle(e.target.value)}
                  />
                  </div>
                  <div className='w-full space-y-1'>
                    <h1 className='font-medium'>Segment description</h1>
                  <input
                    type="text"
                    className="py-2 px-8 rounded border-2 border-neutral-600 focus:border-neutral-400 focus:outline-none bg-neutral-700 bg-opacity-45 font-medium w-full"
                    placeholder="eg : from local farmers and cleaned before use"
                    onChange={(e)=>{setTextDes(e.target.value)}}
                  />
                  </div>
                  <button
                    className="py-2 px-8 rounded bg-indigo-950 bg-opacity-45 hover:bg-indigo-800 border-2 border-opacity-45 border-indigo-400 font-medium hover:border-indigo-400 hover:border-opacity-0"
                    onClick={handleSubmitClicked}
                  >
                    Add
                  </button>
                </div>
              ) : selectedOption === "image" ? (
                <div className="flex items-end gap-4 w-full">
                  <div className='space-y-2'>
                    <h1>Title</h1>
                    <input
                    type="text"
                    className="py-3 px-8 rounded border-2 border-neutral-600 focus:border-neutral-400 focus:outline-none bg-neutral-700 bg-opacity-45 font-medium"
                    placeholder="eg : net weight"
                    onChange={(e)=>setTextTitle(e.target.value)}
                  />
                  </div>
                  <div className='w-full space-y-2'>
                    <h1>File</h1>
                  <input
                    type="file"
                    accept="image/*"
                    className="py-2 px-8 rounded border-2 border-neutral-600 font-medium w-full"
                  />
                  </div>
                  <button
                    className="py-3 px-8 rounded bg-indigo-950 bg-opacity-45 hover:bg-indigo-800 border-2 border-opacity-45 border-indigo-400 font-medium border-dashed hover:border-indigo-400 hover:border-opacity-0"
                    onClick={handleSubmitClicked}
                  >
                    Add
                  </button>
                </div>
              ) : null}
            </div>
          )}

          <div className="absolute right-1 top-1" onClick={close}>
            <IconButton variant="surface">
              <Cross1Icon />
            </IconButton>
          </div>
        </div>
      </div>
      <Toaster/>
    </Theme>
  );
}

export default AddStep