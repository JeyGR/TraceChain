"use client";
import { Montserrat } from 'next/font/google';
import { useState } from 'react';
import "@radix-ui/themes/styles.css";
import { Button, Flex, Theme, ThemePanel, Box, TextField, Text, IconButton } from '@radix-ui/themes';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';

const montserrat = Montserrat({ subsets: ['latin'] });

const SignInForm = () => {
  const [showpassword, setShowPassword] = useState<Boolean>(false);
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();
  const [isSubitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async()=>{
    setIsSubmitting(true);
    
    // setIsSubmitting(false);
  }

  return (
    <Theme appearance="dark" grayColor="slate" panelBackground="solid">
      <div
        className={`min-w-full min-h-screen flex justify-center items-center`}
      >
        <div className="bg-neutral-800 md:p-5 p-2 rounded-md min-h-full min-w-96 flex flex-col justify-center items-center gap-5 border border-solid border-neutral-700">
          <h1 className={`${montserrat.className} text-xl md:text-2xl`}>
            SignIn
          </h1>
          <div className='min-w-full'>
            <Flex direction="column" gap="5">
              <Box minWidth="10rem" className='min-w-full'>
                <TextField.Root
                  size="2"
                  type="email"
                  placeholder="Email"
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box minWidth="10rem" className='min-w-full'>
                <TextField.Root
                  size="2"
                  placeholder="Password"
                  required={true}
                  type={showpassword ? `text` : `password`}
                  onChange={(e)=>setPassword(e.target.value)}

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
              <Button variant="solid" onClick={handleSubmit} loading={isSubitting}>SignIn</Button>
              <div className="w-full flex justify-center cursor-pointer">
                <Text color="blue" className={`${montserrat.className} text-sm `}>New user? Try SignIn</Text>
              </div>
            </Flex>
          </div>
        </div>
      </div>
    </Theme>
  );
};

export default SignInForm;
