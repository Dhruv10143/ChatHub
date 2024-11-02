import React, { useRef, useState, useEffect } from 'react';
import { useContext } from 'react';
import './Authen.css';
import Box from './Box';
import { qrCodeImage } from '../Constants/data';
import { AccountContext } from '../Context/AccountProvider';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { addUser } from '../../Service/Api';
const LoginDialog=()=>{
  const {setAccount}=useContext(AccountContext);
  const onLoginSuccess= async(res)=>{
       console.log(res);
       const decoded=jwtDecode(res.credential);
       setAccount(decoded);
       await addUser(decoded);
  }
  const onLoginError=(res)=>{
    console.log(res);
  }

  return (
    <div className="z-50 flex justify-center items-center h-screen">
      <Box width="120vh" height="100vh" backgroundColor="white" className="flex items-center">
        <div className="p-8 flex flex-row items-start">
          <div className="text-2xl font-serif mr-10 w-3/4">
            <span className="text-3xl mb-6 block w-auto">To Use WhatsApp On Your Computer:</span>
            <ol className="text-lg mt-4 pl-2 pt-6">
              <li className="pt-4">1. Open WhatsApp on Your Phone</li>
              <li className="pt-4">2. Tap <strong>Menu</strong> or <strong>Settings</strong>, then select <strong>Linked Devices</strong></li>
              <li className="pt-4">3. Point your phone at this screen to capture the code</li>
            </ol>
          </div>
          <div className="relative flex flex-col items-center ml-auto">
            <img src={qrCodeImage} alt="qrcode" className="w-full h-full" />
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded shadow-lg">
              <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default LoginDialog;
