"use client";
import { Box, Button, Flex, IconButton, Select, Text, TextField, Theme, ThemePanel } from '@radix-ui/themes';
import React, { useRef, useState } from 'react'
import { Cross1Icon, FaceIcon } from '@radix-ui/react-icons';
import toast, { Toaster } from 'react-hot-toast';

interface modalProps{
  close : ()=>void;
}

const AddProduct : React.FC<modalProps> = ({close}) => {
  const [isOpen, setIsOpen] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);
  const [selectedType, setSelectedType] = useState("select");


  const handleAddProperty =()=>{
    if(titleRef.current?.value==="" || selectedType==="select" || valueRef.current?.value==""){
      toast.error("All values must be entered!");
      return;
    }
  }

  interface FormField {
    title: string;
    value: string;
    type: string
  }
  
  const formData: FormField[] = [
    { title: "Product Name", value: "eg: yoga bar, coke, tropicana", type: "text" },
    { title: "Product description", value: "eg: natural energy bar", type: "text" },
    { title: "Maximum retail price", value: "eg: ₹499", type: "text" },
    { title: "Company", value: "eg: abc pvt. ltd.", type: "text" },
    { title: "Contact info", value: "eg: abc.enquiry@gmail.com", type: "text" },
    { title: "Net weight", value: "eg: 1.5kg", type: "text" },
    { title: "Country of origin", value: "eg: India", type: "text" },
    { title: "Age restriction", value: "eg: only for 16+", type: "text" }
  ];
  
  return (
    <Theme grayColor="olive" appearance="dark">
      <div className="fixed inset-0 bg-black bg-opacity-70 w-full flex justify-center z-50 p-6 md:py-32 md:px-32">
        <div className="relative w-full h-full bg-neutral-700 bg-opacity-75 rounded-lg border-2 border-neutral-400 border-opacity-25 p-5 backdrop-blur-md flex flex-col gap-3 md:gap-8">
          <div className="w-full text-center">
            <h1 className="text-2xl font-medium">Add a new product</h1>
          </div>
          <div className="flex flex-col flex-1 overflow-auto">
            <div className="md:px-5 w-full flex flex-col md:grid md:grid-cols-2 gap-4">
              {formData.map((item, key) => (
                <div className="w-full max-h-fit" key={key}>
                  <h1 className="font-medium text-base text-neutral-300">
                    {item.title}
                  </h1>
                  <Box minWidth="10rem" className="min-w-full">
                    <TextField.Root
                      size="2"
                      type={item.type}
                      placeholder={item.value}
                      required={true}
                    />
                  </Box>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col justify-between md:px-5">
            <div></div>
            <div className="w-full flex justify-between">
              <div>
                <Button
                  variant="solid"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Add new property
                </Button>
              </div>
              <div>
                <Button variant="solid">Submit</Button>
              </div>
            </div>
          </div>
          <div className="absolute right-4 top-4" onClick={close}>
            <IconButton variant="surface">
              <Cross1Icon />
            </IconButton>
          </div>
          {isOpen && (
            <div className="fixed inset-0 w-full h-full bg-neutral-800 bg-opacity-55 flex justify-center items-center z-50">
              <div className="rounded-md flex flex-col gap-4 md:gap-6 bg-neutral-500 border-2 border-neutral-400 border-opacity-30 bg-opacity-35 backdrop-blur-lg p-5 relative md:w-1/3 md:min-h-1/3">
                <h1 className="font-bold text-xl">Add a property</h1>
                <div>
                  <h1 className="font-medium text-neutral-200">
                    Property title
                  </h1>
                  <TextField.Root placeholder="eg : net weight" size="3" ref={titleRef}>
                    <TextField.Slot></TextField.Slot>
                  </TextField.Root>
                </div>
                <Select.Root
                  value={selectedType}
                  defaultValue="select"
                  onValueChange={setSelectedType}
                  size="3"
                >
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Item value="select" disabled>
                      Select field type
                    </Select.Item>
                    <Select.Item value="text">Text field</Select.Item>
                    <Select.Item value="date" disabled>Date</Select.Item>
                    <Select.Item value="color" disabled>color</Select.Item>
                  </Select.Content>
                </Select.Root>
                <div>
                  <h1 className="font-medium text-neutral-200">Sample value</h1>
                  <TextField.Root placeholder="eg : 1.2kg" size="3" ref={valueRef}>
                    <TextField.Slot></TextField.Slot>
                  </TextField.Root>
                </div>
                <div className="flex justify-end">
                  <Button variant="solid" onClick={handleAddProperty}>
                    Submit
                  </Button>
                </div>
                <div
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <IconButton variant="surface">
                    <Cross1Icon />
                  </IconButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </Theme>
  );
}

export default AddProduct
