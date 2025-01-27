"use client";
import { Montserrat } from 'next/font/google';
import { useState } from 'react';
import "@radix-ui/themes/styles.css";
import { Button, Flex, Theme, Box, TextField, Text, IconButton } from '@radix-ui/themes';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';

const montserrat = Montserrat({ subsets: ['latin'] });

const SignInForm = () => {
  const [showpassword, setShowPassword] = useState<Boolean>(false);
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();
  const [isSubitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate a submission process
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 10 },
    },
    exit: { opacity: 0, y: -50, transition: { ease: "easeInOut", duration: 0.5 } },
  };

  return (
    <Theme appearance="light" grayColor="slate" panelBackground="solid">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        className="min-w-full min-h-screen flex justify-center items-center bg-indigo-50"
      >
        <motion.div
          variants={containerVariants}
          className="bg-indigo-100 md:p-5 p-2 rounded-md min-h-full min-w-96 flex flex-col justify-center items-center gap-5 border border-solid border-indigo-700 border-opacity-25"
        >
          <h1 className={`${montserrat.className} text-xl md:text-2xl`}>
            SignIn
          </h1>
          <div className="min-w-full">
            <Flex direction="column" gap="5">
              <Box minWidth="10rem" className="min-w-full">
                <TextField.Root
                  size="2"
                  type="email"
                  placeholder="Email"
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box minWidth="10rem" className="min-w-full">
                <TextField.Root
                  size="2"
                  placeholder="Password"
                  required={true}
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
              <Button
                variant="solid"
                color="indigo"
                onClick={handleSubmit}
                loading={isSubitting}
              >
                SignIn
              </Button>
              <div className="w-full flex justify-center cursor-pointer">
                <Text
                  color="indigo"
                  className={`${montserrat.className} text-sm `}
                >
                  New user? Try SignIn
                </Text>
              </div>
            </Flex>
          </div>
        </motion.div>
      </motion.div>
    </Theme>
  );
};

export default SignInForm;
