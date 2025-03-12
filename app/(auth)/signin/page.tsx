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
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const montserrat = Montserrat({ subsets: ["latin"] });

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const floatingVariants = {
    float: {
      y: [-15, 15, -15],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading("Signing in...");
    try {
      if (email === "" || password === "") {
        toast.error("Must fill all fields!", { id: toastId });
        return;
      }
      const response = await axios.post("/api/signin", { email, password });
      if (response.data.msg === "success") {
        localStorage.setItem("offToken", response.data.token);
        localStorage.removeItem("Token");
        toast.success("Signed In", { id: toastId });
        router.push("/home");
      } else {
        toast.error(response.data.msg, { id: toastId });
      }
    } catch (error) {
      console.error("Error in Officer login:", error);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Theme appearance="dark" grayColor="slate">
      <div className="min-h-screen flex">
        <motion.div 
          className="hidden md:flex flex-1 flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900/80 via-blue-900/20 to-slate-900/80"
          style={{ flexBasis: "33.333%" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 backdrop-blur-xl" />
          
          <motion.div 
            className="relative z-10 p-8 text-center"
            variants={floatingVariants}
            animate="float"
          >
            <h2 className={`${montserrat.className} text-4xl font-bold mb-4 text-blue-400`}>
              Welcome Back
            </h2>
            <p className="text-slate-300 text-lg max-w-xs">
              Know your food products better!
            </p>
          </motion.div>

          {/* Animated Background Elements */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 rounded-full bg-blue-400/10 blur-lg"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`
              }}
              animate={{
                y: [0, -60, 0],
                scale: [1, 0.8, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: Math.random() * 6 + 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Right Column - Form */}
        <div className="flex-1 flex items-center justify-center p-8 bg-slate-900">
          <motion.div 
            className="w-full max-w-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-container bg-slate-800/30 backdrop-blur-lg rounded-xl p-8 border border-slate-700/50">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-6 w-full"
              >
                <motion.h1 
                  variants={itemVariants}
                  className={`${montserrat.className} text-3xl font-bold text-center mb-8 text-slate-100`}
                >
                  SignIn
                </motion.h1>

                <motion.div variants={itemVariants}>
                  <TextField.Root
                    size="3"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-700/20 hover:bg-slate-700/30 transition-colors"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <TextField.Root
                    size="3"
                    placeholder="Password"
                    value={password}
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-700/20 hover:bg-slate-700/30 transition-colors relative pl-5"
                  >
                    <TextField.Slot className="absolute right-2 top-1/2 -translate-y-1/2">
                      <IconButton
                        variant="ghost"
                        size="2"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="text-slate-400 hover:text-slate-200"
                      >
                        {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                      </IconButton>
                    </TextField.Slot>
                  </TextField.Root>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-4">
                  <Button
                    size="3"
                    className="!w-full bg-blue-600 hover:bg-blue-700 text-slate-100 font-medium rounded-lg transition-colors"
                    onClick={handleSubmit}
                    loading={isSubmitting}
                  >
                    Sign In
                  </Button>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="text-center pt-4"
                >
                  <Text
                    className={`${montserrat.className} text-slate-400 text-sm hover:text-blue-400 transition-colors cursor-pointer`}
                    onClick={() => router.push("/signup")}
                  >
                    New user?{" "}
                    <span className="font-semibold">Create account</span>
                  </Text>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f8fafc',
            border: '1px solid #334155'
          }
        }}
      />
    </Theme>
  );
};

const SignInComponent = dynamic(()=>Promise.resolve(SignInForm), {
  ssr:false
})

export default SignInComponent;