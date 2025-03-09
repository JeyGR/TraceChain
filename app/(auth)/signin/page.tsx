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
    <Theme appearance="dark" grayColor="slate" panelBackground="solid">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full max-w-md bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10"
        >
          <motion.h1 
            variants={itemVariants}
            className={`${montserrat.className} text-3xl font-bold text-center mb-8 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent`}
          >
            Welcome Back
          </motion.h1>

          <motion.div variants={containerVariants} className="space-y-6">
            <motion.div variants={itemVariants}>
              <TextField.Root
                size="3"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <TextField.Root
                size="3"
                placeholder="Password"
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <TextField.Slot>
                  <IconButton
                    variant="ghost"
                    size="2"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="hover:bg-white/10 rounded-full"
                  >
                    {showPassword ? (
                      <EyeOpenIcon className="text-gray-400 w-5 h-5" />
                    ) : (
                      <EyeClosedIcon className="text-gray-400 w-5 h-5" />
                    )}
                  </IconButton>
                </TextField.Slot>
              </TextField.Root>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                size="3"
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-lg font-semibold rounded-lg transform transition-all hover:scale-[1.02] active:scale-95"
                onClick={handleSubmit}
                loading={isSubmitting}
              >
                Sign In
              </Button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="text-center mt-6"
            >
              <Text
                color="gray"
                className={`${montserrat.className} cursor-pointer hover:text-emerald-400 transition-colors inline-block`}
                onClick={() => router.push("/signup")}
              >
                New user?{" "}
                <span className="font-semibold underline underline-offset-4 decoration-emerald-400">
                  Create an account
                </span>
              </Text>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <Toaster position="top-center" />
    </Theme>
  );
};

export default SignInForm;