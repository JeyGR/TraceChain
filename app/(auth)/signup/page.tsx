"use client";
import { Montserrat } from "next/font/google";
import { useState } from "react";
import "@radix-ui/themes/styles.css";
import { Button, Theme, TextField, Text, IconButton } from "@radix-ui/themes";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const montserrat = Montserrat({ subsets: ["latin"] });

const SignInForm = () => {
  const [showpassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [isSubitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if(name===""  || email===""  || password===""){
      toast.error("Must fill all fields");
      setIsSubmitting(false);
      return;
    }
    if(confirmPass!=password){
      toast.error("Paswords doesn't match");
      setIsSubmitting(false);
      return;
    }
    const toastId = toast.loading("Signing up...");
    try {
      const response = await axios.post("/api/signup", {name, email, password});
      if(response.data.msg==="success"){
         const offToken = response.data.offToken;
         localStorage.setItem("offToken", offToken);
         localStorage.removeItem("token");
         toast.success("Signup success", {id:toastId});
        router.push("/home");
      }
      else{
        toast.error(response.data.msg, {id:toastId});
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {id:toastId});
    }
    finally{
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
            className="absolute w-64 h-64 rounded-full bg-blue-500/10 blur-xl -top-32 -left-32"
            animate={{
              y: [0, 100, 0],
              rotate: [0, 180],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="relative z-10 p-8 text-center"
            variants={floatingVariants}
            animate="float"
          >
            <h2 className={`${montserrat.className} text-4xl font-bold mb-4 text-blue-400`}>
              Welcome Aboard
            </h2>
            <p className="text-slate-300 text-lg max-w-xs">
              Taste the essence of food products transparency with us
            </p>
          </motion.div>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 rounded-full bg-blue-400/20 blur-sm"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`
              }}
              animate={{
                y: [0, -40, 0],
                scale: [1, 0.8, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: Math.random() * 4 + 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        <div className="flex-1 flex items-center justify-center p-8 bg-slate-900">
          <motion.div 
            className="w-full max-w-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-container bg-slate-800/30 backdrop-blur-lg rounded-xl p-8 border border-slate-700/50">
              <h1 className={`${montserrat.className} text-3xl font-bold mb-8 text-center text-slate-100`}>
                Create Account
              </h1>

              <div className="space-y-5 w-full">
                <TextField.Root
                  size="3"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-700/20 hover:bg-slate-700/30 transition-colors"
                />

                <TextField.Root
                  size="3"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-700/20 hover:bg-slate-700/30 transition-colors"
                />

                <TextField.Root
                  size="3"
                  placeholder="Password"
                  value={password}
                  type={showpassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-700/20 hover:bg-slate-700/30 transition-colors relative"
                >
                  <TextField.Slot className="absolute right-2 top-1/2 -translate-y-1/2">
                    <IconButton
                      variant="ghost"
                      size="2"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-slate-400 hover:text-slate-200"
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
                  className="!w-full bg-slate-700/20 hover:bg-slate-700/30 transition-colors relative"
                >
                  <TextField.Slot className="absolute top-1/2 -translate-y-1/2 right-2">
                    <IconButton
                      variant="ghost"
                      size="2"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="text-slate-400 hover:text-slate-200"
                    >
                      {showConfirmPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    </IconButton>
                  </TextField.Slot>
                </TextField.Root>

                <Button
                  size="3"
                  className="!w-full bg-blue-600 hover:bg-blue-700 text-slate-100 font-medium rounded-lg transition-colors"
                  onClick={handleSubmit}
                  loading={isSubitting}
                >
                  Sign Up
                </Button>
                <div className="text-center pt-4">
                  <Text
                    className={`${montserrat.className} text-slate-400 text-sm hover:text-blue-400 transition-colors cursor-pointer`}
                    onClick={() => router.push("/signin")}
                  >
                    Already have an account? 
                    <span className="font-semibold ml-1">Sign In</span>
                  </Text>
                </div>
              </div>
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


const SignInComponent = dynamic(()=>Promise.resolve(SignInForm),{
  ssr:false
})
export default SignInComponent