import { Typography } from '@mui/material';
import React from 'react';
import { Search, MoreVert } from '@mui/icons-material';
import { defaultProfilePicture } from '../../Constants/data';
import { useContext  } from 'react';
import { AccountContext } from '../../Context/AccountProvider';

const ChatsHeader = ({person}) => {
  const {activeUsers}=useContext(AccountContext);
  return (
    <div className='h-[60px] bg-zinc-200 py-[8px] px-[16px] flex items-center'>
      <img
        className='h-[40px] w-[40px] object-cover rounded-full'
        src={person.picture}
        alt="dp"
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
            color: 'rgba(0, 0, 0, 0.6)' // Fixed the rgba syntax
          }}
        >
          {activeUsers?.find(user=>user.sub===person.sub) ? 'Online':'Offline' }
        </Typography>
      </div>
      <div className='ml-auto flex items-center'> {/* Flexbox with gap */}
        <Search sx={{ marginRight: '17px', fontSize:'24px' }} /> {/* Add margin to the right of Search icon */}
        <MoreVert sx={{ marginRight: '8px', fontSize:'24px' }}/>
      </div>
    </div>
  );
};

export default ChatsHeader;
