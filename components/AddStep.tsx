"use client";
import { Cross1Icon } from '@radix-ui/react-icons';
import { IconButton, Theme } from '@radix-ui/themes';
import { Montserrat } from 'next/font/google';
import React, { useState } from 'react'

interface componentProp {
    close:()=>void;
}
const montserrat = Montserrat({subsets:['latin']});

const AddStep : React.FC<componentProp> = ({close}) => {
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
      <div className={`fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-8 lg:p-32 ${montserrat.className}`}>
        <div className="bg-neutral-700 bg-opacity-70 backdrop-blur-md border-2 border-opacity-30 border-neutral-400 flex flex-col gap-5 w-full h-full rounded-lg  md:py-10 md:px-5 lg:p-10 py-10 px-2">
          <div className="w-full min-h-8 rounded bg-neutral-600 border-2  bg-opacity-35 backdrop-blur-lg border-opacity-25 border-neutral-400 flex flex-col gap-3 p-5">
            <div className="w-full text-center pb-4 border-b-2 border-neutral-400 border-opacity-30">
              <h1 className="text-xl font-bold">Product</h1>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {props.map((item, key) => (
                <h1 className="text-lg font-semibold text-white" key={key}>
                  {item.name} : <span className="font-light text-neutral-200">{item.prop}</span>
                </h1>
              ))}
            </div>
          </div>
            <div className='w-full flex justify-center'>
                <button className='py-2 px-8 rounded bg-indigo-950 bg-opacity-45 hover:bg-indigo-800 border-2 border-opacity-45 border-indigo-400 font-medium border-dashed hover:border-indigo-400 hover:border-solid'>Add a new process</button>
            </div>
          <div className="absolute right-1 top-1" onClick={close}>
            <IconButton variant="surface">
              <Cross1Icon />
            </IconButton>
          </div>
        </div>
      </div>
    </Theme>
  );
}

export default AddStep