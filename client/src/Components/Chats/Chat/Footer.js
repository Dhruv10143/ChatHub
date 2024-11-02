import {React,useState,useEffect} from 'react'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import InputBase from '@mui/material/InputBase';
import { uploadFile } from '../../../Service/Api';

const Footer=({sendText,setValue,value,file,setFile,setImg})=> {
   const onFileChange=(e)=>{
    console.log(e);
    setFile(e.target.files[0]);
    setValue(e.target.files[0].name);

   }
   useEffect(()=>{
       const setImage=async()=>{
         if(file){
           const data=new FormData();
           data.append("name",file.name);
           data.append("file",file);
           let response=await uploadFile(data);
           setImg(response.data);
         }
       }
       setImage();
   },[file])
  return (
    <div className='h-[63px] bg-gray-200 flex items-center w-full px-[15px] text-gray-400'  >
        <EmojiEmotionsOutlinedIcon className='m-[5px]'/>
        <label htmlFor="fileInput">
        <AttachFileOutlinedIcon className='m-[5px] rotate-45'/>
        </label>
        <input type="file" 
        id="fileInput"
        style={{display:'none'}}
        onChange={(e)=>onFileChange(e)}/>
        <div className='mx-[5px] my-[0px] py-[5px] bg-white rounded-[5px] w-[calc(94%-25px)] text-sm'><InputBase className="pl-[15px] w-full"placeholder='Type a message' onChange={(e)=>setValue(e.target.value)} onKeyUp={(e)=>sendText(e)} value={value}/></div>
        <MicOutlinedIcon className='m-[5px]' />
    </div>
  )
}

export default Footer