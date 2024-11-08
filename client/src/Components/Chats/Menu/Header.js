import React, { useContext, useState } from 'react';
import { AccountContext } from '../../Context/AccountProvider';
import Box from '@mui/material/Box'; 
import ChatIcon from '@mui/icons-material/Chat';
import InfoDrawer from '../../Drawer/InfoDrawer';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { IconButton } from '@mui/material';
// components
import HeaderMenu from './HeaderMenu';
import CreateGroups from './CreateGroups'; // Import CreateGroups component

function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showCreateGroups, setShowCreateGroups] = useState(false); // State to show CreateGroups
  const { account } = useContext(AccountContext);
  
  const toggleDrawer = () => {
    setOpenDrawer(true);
  };

  const handleGroupClick = () => {
    setShowCreateGroups((prev) => !prev); // Toggle CreateGroups visibility
  };

  return (
    <div>
      <div 
        className="h-[60px] py-[8px] px-[16px] flex items-center" 
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: 'white',
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
          <IconButton onClick={handleGroupClick}>
            <GroupAddIcon style={{ color: 'white' }} />
          </IconButton>
          <HeaderMenu setOpenDrawer={setOpenDrawer} />
        </Box>
        <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
      </div>
      
      {/* Conditionally render CreateGroups */}
      {showCreateGroups && <CreateGroups />}
    </div>
  );
}

export default Header;
