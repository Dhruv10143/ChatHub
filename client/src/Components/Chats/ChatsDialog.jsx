import {React,useContext} from 'react';
import Box from './Box';
import Menu from './Menu/Menu';
import EmptyChats from './Chat/EmptyChats';
import Chats from './Chat/Chats';
import { AccountContext } from '../Context/AccountProvider';
import { AcUnitOutlined } from '@mui/icons-material';

function ChatsDialog() {
  const {person}=useContext(AccountContext);
  return (
    <div style={{ position: 'relative',
    backgroundImage:'url(https://img.freepik.com/free-photo/top-view-easter-background-with-copyspace_23-2148059781.jpg?t=st=1731005871~exp=1731009471~hmac=64c9e3d57986f2d1f0ccd3867bf29e140de9ad94bb6abfe3023c54550e297911&w=996)' }}>
      <div className=" h-32">
      </div>
      <div className=' h-[85%] pb-[1000px]'style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 999 }}>
        <Box width="205vh"  backgroundColor="green " className=" flex items-center">
          <div className="flex relative h-[105%]"
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <div className='w-1/4 h-full p-0 m-0'>
              <Menu />
            </div>
            <div className=' relative w-3/4 h-full min-w-3 border-l-2 p-0 m-0'>
            {Object.keys(person).length? <Chats />:<EmptyChats />}
            </div>
          </div>
        </Box>
      </div>
      <div className=" h-screen">
        {/* Content for the second div */}
      </div>
    </div>
  );
}

export default ChatsDialog;
