import {React,useContext} from 'react'
import { AccountContext } from '../Context/AccountProvider'
import { Typography } from '@mui/material';
const Profile=()=> {
    const {account}=useContext(AccountContext);
  return (
    <div>
       <div className='flex justify-center py-[35px]'>
       <img src={account.picture} alt="profile" className="w-[250px] h-[250px] px-[0px] rounded-full mr-0 flex justify-center" />
       </div>
       <div className='bg-white pt-[12px] pr-[30px]  pl-[35px] drop-shadow-md'>
        <Typography className='text-emerald-300 style={{ fontWeight: 200 }}'>Your name</Typography>
        <Typography className='pb-[14px] pt-[17px]'>{account.name}</Typography>
       </div>
       <div className='pr-[20px] pb-[28px] pl-[30px] pt-[28px]'><Typography className='text-xs text-gray-400'>This is not your username or pin.This name will be visible to your WhatsApp contacts.</Typography></div>
       <div className='bg-white pt-[12px] pr-[30px]  pl-[35px] drop-shadow-md'>
        <Typography className='text-emerald-300 style={{ fontWeight: 200 }}'>About</Typography>
        <Typography className='pb-[14px] pt-[17px]'>LOL</Typography>
       </div>

    </div>
  )
}

export default Profile