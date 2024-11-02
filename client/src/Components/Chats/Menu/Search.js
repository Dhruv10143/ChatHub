import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { InputBase,styled} from '@mui/material';
import Box from '@mui/material/Box';


const Search=({setText})=> {
  return (
    <div className="bg-white h-[45px] border-b border-[#F2F2F2] flex  items-center">
        <div className="bg-zinc-200 relative mx-[13px] w-full rounded-lg">
            <div className="absolute h-full text-gray-500 px-[8px] py-[2px]">
               <SearchIcon fontSize='small'/>
            </div>
            <InputBase className="w-full p-4 pl-16 h-[18px] text-sm" placeholder='Search or start new chat' onChange={(e)=>setText(e.target.value)} />
            
        </div>
    </div>
         
  )
}

export default Search
