import React from 'react'
import {emptyChatImage} from '../../Constants/data'
import Divider from '@mui/material/Divider';

const EmptyChats=()=> {
  return (
    <div className='bg-gray-50 h-[100%] absolute w-[75%] py-[50px] text-center flex justify-center'>
        
        <div className='px-[200px]  flex flex-col items-center'>
        <img className='w-[500px]  mt-[100px] mr-[4px]' src={emptyChatImage} alt="img" />
          <div className='text-4xl mt-[25px] mb-[10px] font-sans text-gray-500'>WhatsApp Web</div>
          <div className='text-xl font-sans text-gray-400'>Now send and receive messages without keeping your phone online.</div>
          <div className='text-xl font-sans text-gray-400'>Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</div>
          <Divider className='w-full py-[30px]' />
        </div>
        </div>
  )
}

export default EmptyChats