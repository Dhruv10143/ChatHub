import React, { useContext, useState } from 'react';
import { AccountContext } from '../../Context/AccountProvider';
import Box from '@mui/material/Box'; 
import ChatIcon from '@mui/icons-material/Chat';
import InfoDrawer from '../../Drawer/InfoDrawer';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
// components
import HeaderMenu from './HeaderMenu';

function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { account } = useContext(AccountContext);
  
  const toggleDrawer = () => {
    setOpenDrawer(true);
  };

  return (
    <div>
      <div 
        className="h-[60px] py-[8px] px-[16px] flex items-center" 
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Black with 60% transparency
          color: 'white', // White text color
          // Adds a 5px border radius
        }}
      >
        <img 
          src={account.picture} 
          alt="profile" 
          className="w-[40px] h-[40px] rounded-full mr-2 cursor-pointer" 
          onClick={() => toggleDrawer()} 
        />
        <div>{account.name}</div>
        <Box className="ml-auto flex items-center gap-4">
          <GroupAddIcon style={{ color: 'white' }} /> {/* Make icon white */}
          <HeaderMenu setOpenDrawer={setOpenDrawer} />
        </Box>
        <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
        <span className="ml-2"></span> 
      </div>
    </div>
  );
}

export default Header;
