"use client";
import { Cross1Icon } from '@radix-ui/react-icons';
import { IconButton, Theme } from '@radix-ui/themes';
import React from 'react'

interface componentProps {
    close : ()=>void
}

const AddFeedback:React.FC<componentProps> = ({close}) => {
  return (
    <Theme appearance="light">
      <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="px-6 py-4 rounded-lg bg-white shadow-lg relative">
          <div className="border-b border-neutral-300 mb-2">
            <h1 className="text-xl font-medium text-neutral-600">
              Add a Feedback
            </h1>
          </div>
          <input
            type="text"
            placeholder="Add your user feedback"
            className="h-8 w-96 p-3 border border-neutral-300 rounded-lg text-neutral-700 text-start focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="w-full flex justify-end pt-4">
            <button
              className="py-2 px-4 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={close}
            >
              Submit
            </button>
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

export default AddFeedback
