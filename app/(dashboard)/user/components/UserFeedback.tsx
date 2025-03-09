/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "@radix-ui/themes/styles.css";
import { Montserrat } from "next/font/google";
import React, { useEffect, useState } from "react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import AddFeedback from "@/components/AddFeedback";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/utils/helper";

const montserrat = Montserrat({ subsets: ["latin"] });



const UserFeedback = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState<
    { user: string; date: string; time: string; content: string }[]
  >([]);
  const [pid, setPid] = useState<any>("");
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    setPid(params?.unique_id);
    const handleFetchFeedback = async () => {
      try {
        const pid = params?.unique_id;
        console.log(pid);
        const response = await axios.post("/api/getproductfeedback", {
          pid: pid,
        });
        const tempFeedback: {
          user: any;
          date: any;
          time: any;
          content: any;
        }[] = [];
        if (response.data.msg == "success") {
          response.data.feedbacks.map((item: any) => {
            var date = item.createdAt.split("T")[0];
            date = date.split("-");
            date.reverse();
            const formatedDate = date.join("/");
            const time = item.createdAt.split("T")[1];
            const formatedTime = convertTimeFormat(time);
            tempFeedback.push({
              user: item.user.charAt(0).toUpperCase() + item.user.slice(1),
              date: formatedDate,
              time: formatedTime,
              content: item.content,
            });
          });
          setFeedback(tempFeedback);
        } else {
          toast.error(response.data.msg);
        }
      } catch (error) {
        console.log("Error from getting feedback : ", error);
        toast.error("Unexpected error occured");
      }
    };
    handleFetchFeedback();
  }, []);

  const convertTimeFormat = (time: string) => {
    // const utcDate = new Date(time);
    // const istOffset = 5.5 * 60 * 60 * 1000;
    // const istDate = new Date(utcDate.getTime() + istOffset);
    // const hours = istDate.getHours().toString().padStart(2, '0');
    // const minutes = istDate.getMinutes().toString().padStart(2, '0');
    // const seconds = istDate.getSeconds().toString().padStart(2, '0');
    // const milliseconds = istDate.getMilliseconds().toString().padStart(3, '0');
    // const formattedISTTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;
    return time.split(".")[0];
    //Need to convert to IST time;
  };

  const handleModalClose = () => {
    setIsFeedbackOpen(false);
  };

  const handleOpenAddModal = ()=> {
    const logged = isLoggedIn();
    if (logged) {
      setIsFeedbackOpen(true)
    } else {
      router.push("/usersignin")
    }
  }


  const handleAddFeedback = async (content: string) => {
    try {
      const item = {
        pid: pid,
        user: localStorage.getItem("token"),
        content: content,
      };
      const response = await axios.post("/api/addfeedback", { item });
      if (response.data.msg === "success") {
        toast.success("Feedback added");
        const newFeedback = response.data.feedback;
        var date = newFeedback.createdAt.split("T")[0];
        date = date.split("-");
        date.reverse();
        const formatedDate = date.join("/");
        const formatedName =
          newFeedback.user.charAt(0).toUpperCase() + newFeedback.user.slice(1);
        setFeedback((prev) => [
          ...prev,
          {
            user: formatedName,
            date: formatedDate,
            time: newFeedback.createdAt.split("T")[1].split(".")[0],
            content: newFeedback.content,
          },
        ]);
        console.log(feedback);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log("Error in adding feedback :", error);
    }
    setIsFeedbackOpen(false);
  };

  return (
    <div className={`w-full h-full bg-gray-50 ${montserrat.className}`}>
      <div className="flex flex-col h-full">
        <div className="bg-indigo-600 text-white p-4 rounded-t-lg">
          <h1 className="text-xl font-medium text-center">User Reviews</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {feedback.length === 0 && (
            <div className="text-gray-500 text-center py-6">
              No reviews yet. Be the first to share your experience!
            </div>
          )}
          
          {feedback?.map((item, key) => (
            <div 
              key={key}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-indigo-600">{item.user}</span>
                  <span className="text-sm text-gray-500">
                    {item.date} • {item.time}
                  </span>
                </div>
              </div>
              <p className="text-gray-700">{item.content}</p>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleOpenAddModal}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            <ChatBubbleIcon className="w-5 h-5" />
            Add Review
          </button>
        </div>
      </div>

      {isFeedbackOpen && (
        <AddFeedback
          close={handleModalClose}
          handleAddFeedback={handleAddFeedback}
        />
      )}
      <Toaster position="top-right" />
    </div>
  );
};

export default UserFeedback;

