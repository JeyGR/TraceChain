"use client";
import { Montserrat } from "next/font/google";
import { useState } from "react";
import "@radix-ui/themes/styles.css";
import {
  Button,
  Flex,
  Theme,
  Box,
  TextField,
  Text,
  IconButton,
} from "@radix-ui/themes";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

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
      toast.error("Something went wrong", {id:toastId});
    }
    finally{
      setIsSubmitting(false);
    }
  };

  return (
    <Theme appearance="dark" grayColor="slate" panelBackground="solid">
      <div
        className={`min-w-full min-h-screen flex justify-center items-center `}
      >
        <div className="bg-neutral-800 md:p-5 p-2 rounded-md min-h-full min-w-96 flex flex-col justify-center items-center gap-5 border border-solid border-neutral-700">
          <h1 className={`${montserrat.className} text-xl md:text-2xl`}>
            SignUp
          </h1>
          <div className="min-w-full">
            <Flex direction="column" gap="5">
              <Box minWidth="10rem" className="min-w-full">
                <TextField.Root
                  size="2"
                  placeholder="Name"
                  required={true}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box minWidth="10rem" className="min-w-full">
                <TextField.Root
                  size="2"
                  type="email"
                  placeholder="Email"
                  value={email}
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box minWidth="10rem" className="min-w-full">
                <TextField.Root
                  size="2"
                  placeholder="Password"
                  required={true}
                  value={password}
                  type={showpassword ? `text` : `password`}
                  onChange={(e) => setPassword(e.target.value)}
                >
                  <TextField.Slot></TextField.Slot>
                  <TextField.Slot>
                    <IconButton
                      variant="ghost"
                      size="1"
                      color="gray"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showpassword ? (
                        <EyeOpenIcon color="gray" />
                      ) : (
                        <EyeClosedIcon color="gray" />
                      )}
                    </IconButton>
                  </TextField.Slot>
                </TextField.Root>
              </Box>
              <Box minWidth="10rem" className="min-w-full">
                <TextField.Root
                  size="2"
                  placeholder="confirm password"
                  required={true}
                  value={confirmPass}
                  type={showConfirmPassword ? `text` : `password`}
                  onChange={(e) => setConfirmPass(e.target.value)}
                >
                  <TextField.Slot></TextField.Slot>
                  <TextField.Slot>
                    <IconButton
                      variant="ghost"
                      size="1"
                      color="gray"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? (
                        <EyeOpenIcon color="gray" />
                      ) : (
                        <EyeClosedIcon color="gray" />
                      )}
                    </IconButton>
                  </TextField.Slot>
                </TextField.Root>
              </Box>
              <Button
                variant="solid"
                onClick={handleSubmit}
                loading={isSubitting}
              >
                SignUp
              </Button>
              <div className="w-full flex justify-center cursor-pointer" onClick={()=>router.push("/signin")}>
                <Text
                  color="blue"
                  className={`${montserrat.className} text-sm `}
                >
                  Already have an account? Try SignIn
                </Text>
              </div>
            </Flex>
          </div>
        </div>
      </div>
      <Toaster/>
    </Theme>
  );
};

export default SignInForm;
