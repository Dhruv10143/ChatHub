import React, { useContext,useState } from 'react';
import { AccountContext } from '../../Context/AccountProvider';
import Box from '@mui/material/Box'; 
import ChatIcon from '@mui/icons-material/Chat';
import InfoDrawer from '../../Drawer/InfoDrawer';


// componenets
import HeaderMenu from './HeaderMenu'

function Header() {
  const[openDrawer, setOpenDrawer]=useState(false);
  const { account } = useContext(AccountContext);
  const toggleDrawer=()=>{
    setOpenDrawer(true);
  }

  return (
    <div>
      <div className="bg-zinc-200 h-[60px] py-[8px] px-[16px] flex items-center">
        <img src={account.picture} alt="profile" className="w-[40px] h-[40px] rounded-full mr-2" onClick={()=>toggleDrawer()}/>
        <div>{account.name}</div>
        <Box className="ml-auto flex items-center  gap-4">
          <ChatIcon  />
          <HeaderMenu  setOpenDrawer={setOpenDrawer}/>
        </Box>
        <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
        <span className="ml-2"></span> 
      </div>
    </div>
  );
}

export default Header;
