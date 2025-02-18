"use client";
import "@radix-ui/themes/styles.css";
import { Montserrat } from "next/font/google";
import React, { useEffect, useState } from "react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import AddFeedback from "@/components/AddFeedback";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation";

const montserrat = Montserrat({ subsets: ["latin"] });


const UserFeedback = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState<{user:string, date:string, time:string, content:string}[]>([])
  const[pid, setPid] = useState<any>("");
  const params = useParams();
  
  useEffect(()=>{
    setPid(params?.unique_id);
    const handleFetchFeedback = async()=>{
      try {
        const pid = params?.unique_id;
        console.log(pid);
        const response = await axios.post("/api/getproductfeedback",{pid:pid});
        const tempFeedback :{user:any, date:any,time:any,content:any}[] = [];
        if(response.data.msg=="success"){
          response.data.feedbacks.map((item:any)=>{
            var date = item.createdAt.split('T')[0];
            date = date.split('-');  
            date.reverse(); 
            const formatedDate = date.join('/');
            const time = item.createdAt.split('T')[1];
            const formatedTime = convertTimeFormat(time);
            tempFeedback.push({user:item.user.charAt(0).toUpperCase()+ item.user.slice(1), date:formatedDate, time:formatedTime,content:item.content});
          });
          setFeedback(tempFeedback);
        }
        else{
          toast.error(response.data.msg);
        }
      } catch (error) {
        console.log("Error from getting feedback : ", error);
        toast.error("Unexpected error occured");
      }
    }
    handleFetchFeedback();
  },[])

  const convertTimeFormat = (time: string) => {
    // const utcDate = new Date(time);
    // const istOffset = 5.5 * 60 * 60 * 1000; 
    // const istDate = new Date(utcDate.getTime() + istOffset);
    // const hours = istDate.getHours().toString().padStart(2, '0');
    // const minutes = istDate.getMinutes().toString().padStart(2, '0');
    // const seconds = istDate.getSeconds().toString().padStart(2, '0');
    // const milliseconds = istDate.getMilliseconds().toString().padStart(3, '0');
    // const formattedISTTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;
    return time.split('.')[0];
    //Need to convert to IST time;
  }
  

  const handleModalClose = () => {
    setIsFeedbackOpen(false);
  };

  const handleAddFeedback = async(content:string)=>{
    try {
      const item = {pid:pid, user:localStorage.getItem("token"), content:content};
      const response = await axios.post("/api/addfeedback", {item});
      if(response.data.msg==="success"){
        toast.success("Feedback added");
        const newFeedback = response.data.feedback;
        var date = newFeedback.createdAt.split('T')[0];
        date = date.split('-');
        date.reverse();
        const formatedDate = date.join('/');
        const formatedName = newFeedback.user.charAt(0).toUpperCase() + newFeedback.user.slice(1);
        setFeedback(prev=>[...prev,{ user: formatedName, date: formatedDate, time: newFeedback.createdAt.split('T')[1].split('.')[0], content: newFeedback.content }]);
        console.log(feedback);
      }
      else{
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log("Error in adding feedback :", error);
    }
    setIsFeedbackOpen(false);
  }

  return (
    <div
      className={`max-w-screen w-full min-h-screen bg-gray-100   ${montserrat.className}`}
    >
      <div className=" w-full h-screen flex flex-col items-center overflow-y-auto">
        <div className="w-full h-12 bg-indigo-600 text-white py-2 px-5 shadow-md">
          <h1 className="text-xl font-medium text-center">User reviews</h1>
        </div>
        <div className="overflow-y-auto w-full flex-1 space-y-4 px-4 pb-14">
          {feedback.length==0 && (
            <div className="text-red-500 font-semibold text-center pt-3">
              No feedbacks on this product. Click Add to add your feedback
            </div>
          )}
          {feedback.map((item, key) => (
            <div
              className="w-full px-4 py-3 bg-white shadow rounded-lg my-2 space-y-2"
              key={key}
            >
              <div className="flex items-center gap-2 border-b border-gray-300 pb-1">
                <div className="px-3 bg-blue-100 rounded-md w-fit flex">
                  <h1 className="text-gray-700 font-medium">{item.user}</h1>
                </div>
                <h1 className="text-gray-600">
                  {item.date} ~ {item.time}
                </h1>
              </div>
              <h1 className="text-gray-700">{item.content}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute right-5 bottom-5">
        <button
          className="px-5 py-2 bg-indigo-500 text-white rounded-lg flex gap-2 items-center font-semibold text-xl shadow-md hover:bg-indigo-600"
          onClick={() => setIsFeedbackOpen(true)}
        >
          <ChatBubbleIcon />
          Add
        </button>
      </div>
      {isFeedbackOpen && <AddFeedback close={handleModalClose} handleAddFeedback={handleAddFeedback} />}
      <Toaster/>
    </div>
  );
};

export default UserFeedback;
