"use client";
import { Box, Button, IconButton, Text, TextField, Theme, ThemePanel } from '@radix-ui/themes';
import React from 'react'
import { Cross1Icon } from '@radix-ui/react-icons';

interface modalProps{
  close : ()=>void;
}

const AddProduct : React.FC<modalProps> = ({close}) => {

  return (
    <Theme grayColor="olive" appearance="dark">
      <div className="fixed inset-0 bg-black bg-opacity-70 w-full flex justify-center z-50 p-6 md:py-32 md:px-32">
        <div className="relative w-full h-full bg-neutral-700 bg-opacity-75 rounded-lg border-2 border-neutral-400 border-opacity-25 p-5 backdrop-blur-md flex flex-col gap-3 md:gap-8">
          <div className="w-full text-center">
            <h1 className="text-2xl font-medium">Add a new product</h1>
          </div>
          <div className="md:px-5 w-full max-h-full flex flex-col md:grid md:grid-cols-2 gap-4 overflow-auto">
            <div className="w-full ">
              <h1 className="font-medium text-base text-neutral-300">
                Product Name
              </h1>
              <Box minWidth="10rem" className="min-w-full">
                <TextField.Root
                  size="2"
                  type="text"
                  placeholder="eg: yoga bar, coke, tropicana"
                  required={true}
                />
              </Box>
            </div>
            <div className="w-full ">
              <h1 className="font-medium text-base text-neutral-300">
                Product description
              </h1>
              <Box minWidth="10rem" className="min-w-full">
                <TextField.Root
                  size="2"
                  type="text"
                  placeholder="eg: natural energy bar"
                  required={true}
                />
              </Box>
            </div>
            <div className="w-full ">
              <h1 className="font-medium text-base text-neutral-300">
                Maximum retail price
              </h1>
              <Box minWidth="10rem" className="min-w-full">
                <TextField.Root
                  size="2"
                  type="text"
                  placeholder="eg: ₹499"
                  required={true}
                />
              </Box>
            </div>
            <div className="w-full ">
              <h1 className="font-medium text-base text-neutral-300">
                Company
              </h1>
              <Box minWidth="10rem" className="min-w-full">
                <TextField.Root
                  size="2"
                  type="text"
                  placeholder="eg: abc pvt. ltd."
                  required={true}
                />
              </Box>
            </div>
            <div className="w-full ">
              <h1 className="font-medium text-base text-neutral-300">
                Manufacturing date
              </h1>
              <Box minWidth="10rem" className="min-w-full">
                <TextField.Root
                  size="2"
                  type="date"
                  placeholder="eg: abc pvt. ltd."
                  required={true}
                />
              </Box>
            </div>
            <div className="w-full ">
              <h1 className="font-medium text-base text-neutral-300">
                Expiry date
              </h1>
              <Box minWidth="10rem" className="min-w-full">
                <TextField.Root
                  size="2"
                  type="date"
                  placeholder="eg: abc pvt. ltd."
                  required={true}
                />
              </Box>
            </div>
            <div className="w-full ">
              <h1 className="font-medium text-base text-neutral-300">
                Contact info
              </h1>
              <Box minWidth="10rem" className="min-w-full">
                <TextField.Root
                  size="2"
                  type="text"
                  placeholder="eg: abc.enquiry@gmail.com"
                  required={true}
                />
              </Box>
            </div>
            <div className="w-full ">
              <h1 className="font-medium text-base text-neutral-300">
                Net weight
              </h1>
              <Box minWidth="10rem" className="min-w-full">
                <TextField.Root
                  size="2"
                  type="text"
                  placeholder="eg: 1.5kg"
                  required={true}
                />
              </Box>
            </div>
            <div className="w-full ">
              <h1 className="font-medium text-base text-neutral-300">
                Country of origin
              </h1>
              <Box minWidth="10rem" className="min-w-full">
                <TextField.Root
                  size="2"
                  type="text"
                  placeholder="eg: India"
                  required={true}
                />
              </Box>
            </div>
            <div className="w-full ">
              <h1 className="font-medium text-base text-neutral-300">
                Age restriction
              </h1>
              <Box minWidth="10rem" className="min-w-full">
                <TextField.Root
                  size="2"
                  type="text"
                  placeholder="eg: only for 16+"
                  required={true}
                />
              </Box>
            </div>
          </div>
          <div className="w-full flex flex-col justify-between md:px-5">
            <div></div>
            <div className="w-full flex justify-between">
              <div>
                <Button variant="solid">Add new property</Button>
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
        </div>
      </div>
    </Theme>
  );
}

export default AddProduct
