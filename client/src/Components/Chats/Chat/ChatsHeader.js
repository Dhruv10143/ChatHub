import { Typography } from '@mui/material';
import React, { useState, useContext } from 'react';
import { Search, MoreVert } from '@mui/icons-material';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallIcon from '@mui/icons-material/Call';
import { defaultProfilePicture } from '../../Constants/data';
import { AccountContext } from '../../Context/AccountProvider';
import InfoDrawer from '../drawerRight/InfoDrawer';

const ChatsHeader = ({ person }) => {
  const { activeUsers } = useContext(AccountContext);
  const [openDrawer, setOpenDrawer] = useState(false); // State for drawer control

  const handleImageClick = () => {
    setOpenDrawer(true); // Open drawer when image is clicked
  };

  return (
    <div 
      className='h-[60px] bg-zinc-200 py-[8px] px-[16px] flex items-center'
      style={{
        width: openDrawer ? '70%' : '100%', // Decrease width when drawer is open
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Black with 60% transparency
        color: 'white', // White text color
        borderRadius: '10px', // Rounded corners
        transition: 'width 0.3s ease', // Smooth transition for width change
      }}
    >
      <img
        className='h-[40px] w-[40px] object-cover rounded-full'
        src={person.picture || defaultProfilePicture} // Fallback to default picture
        alt="dp"
        onClick={handleImageClick}
      />
      <div>
        <Typography 
          sx={{
            marginLeft: '15px',
          }}
        >
          {person.name}
        </Typography>
        <Typography 
          sx={{
            marginLeft: '15px',
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.6)' // Adjusted to white text with reduced opacity
          }}
        >
          {activeUsers?.find(user => user.sub === person.sub) ? 'Online' : 'Offline'}
        </Typography>
      </div>
      <div className='ml-auto flex items-center'> {/* Flexbox with gap */}
        <VideocamIcon sx={{ marginRight: '17px', fontSize: '24px' }} />
        <CallIcon sx={{ marginRight: '8px', fontSize: '24px' }}/>
      </div>
      <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </div>
  );
};

export default ChatsHeader;
  