"use client";
import { Montserrat } from "next/font/google";
import { useState } from "react";
import "@radix-ui/themes/styles.css";
import {
  Button,
  Theme,
  TextField,
  Text,
  IconButton,
} from "@radix-ui/themes";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const montserrat = Montserrat({ subsets: ["latin"] });

const SignUpForm = () => {
  const [showpassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [isSubitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
  
    if (name === "" || email === "" || password === "" || confirmPass === "") {
      toast.error("Must fill all fields!");
      setIsSubmitting(false);
      return;
    }
  
    if (password !== confirmPass) {
      toast.error("Passwords do not match");
      setIsSubmitting(false);
      return;
    }
  
    try {
      const response = await axios.post('/api/usersignup', {
        name,
        email,
        password,
      });
      console.log(response.data);
      
      if(response.data.msg==="success"){
        const { token } = response.data;
    
        localStorage.setItem('token', token);
    
        toast.success("Sign up successful!");
    
        router.push('/userhome'); 
  
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPass('');
      }
      else{
        toast.error(response.data.msg);
      }
  
    } catch (error) {
      console.log(error);
      
      toast.error("Unexpected error occured");
    }
    finally{
      setIsSubmitting(false);
    }
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <Theme appearance="light" grayColor="slate">
      <div className="min-h-screen flex">
        {/* Left Column with Animation */}
        <motion.div 
          className="hidden md:flex flex-1 flex-col items-center justify-center relative bg-slate-50"
          style={{ flexBasis: "40%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="relative z-10 p-8 text-center"
            variants={floatingVariants}
            animate="float"
          >
            <h2 className={`${montserrat.className} text-4xl font-bold mb-6 text-slate-800`}>
              Welcome Aboard
            </h2>
            <p className="text-slate-600 text-lg max-w-xs">
              Create your account and join our community
            </p>
          </motion.div>

          {/* Animated Background Elements */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-24 h-24 rounded-full bg-blue-100/50 blur-lg"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`
              }}
              animate={{
                y: [0, -40, 0],
                scale: [1, 0.8, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: Math.random() * 6 + 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        <motion.div 
          className="flex-1 flex items-center justify-center p-8 bg-white w-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-full max-w-md space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${montserrat.className} text-3xl font-bold text-center text-slate-800`}
            >
              Create Account
            </motion.h1>

            <motion.div className="space-y-5">
              <TextField.Root
                size="3"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full focus:ring-2 focus:ring-blue-500"
              >
                <TextField.Slot  className="pl-3 text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </TextField.Slot>
              </TextField.Root>

              <TextField.Root
                size="3"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full focus:ring-2 focus:ring-blue-500"
              >
                <TextField.Slot  className="pl-3 text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </TextField.Slot>
              </TextField.Root>

              <TextField.Root
                size="3"
                placeholder="Password"
                value={password}
                type={showpassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full focus:ring-2 focus:ring-blue-500"
              >
                <TextField.Slot  className="pl-3 text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </TextField.Slot>
                <TextField.Slot>
                  <IconButton
                    variant="ghost"
                    size="2"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    {showpassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </IconButton>
                </TextField.Slot>
              </TextField.Root>

              <TextField.Root
                size="3"
                placeholder="Confirm Password"
                value={confirmPass}
                type={showConfirmPassword ? "text" : "password"}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full focus:ring-2 focus:ring-blue-500"
              >
                <TextField.Slot  className="pl-3 text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </TextField.Slot>
                <TextField.Slot>
                  <IconButton
                    variant="ghost"
                    size="2"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    {showConfirmPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </IconButton>
                </TextField.Slot>
              </TextField.Root>

              <Button
                size="3"
                className="!w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 rounded-lg transition-colors"
                onClick={handleSubmit}
                loading={isSubitting}
              >
                Create Account
              </Button>

              <div className="text-center pt-4">
                <Text
                  className={`${montserrat.className} text-slate-600 text-sm hover:text-blue-600 transition-colors cursor-pointer`}
                  onClick={() => router.push("/usersignin")}
                >
                  Already have an account? 
                  <span className="font-semibold ml-1">Sign In</span>
                </Text>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#fff',
            color: '#1e293b',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }
        }}
      />
    </Theme>
  );
};


const SignUpComponent = dynamic(()=>Promise.resolve(SignUpForm),{
  ssr:false
})

export default SignUpComponent;