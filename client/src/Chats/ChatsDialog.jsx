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
    <div style={{ position: 'relative' }}>
      <div className="bg-emerald-300 h-32">
      </div>
      <div className=' h-[85%] pb-[1000px]'style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 999 }}>
        <Box width="205vh"  backgroundColor="white" className=" flex items-center">
          <div className="flex">
            <div className='w-1/4 h-full p-0 m-0'>
              <Menu />
            </div>
            <div className=' relative w-3/4 h-full min-w-3 border-l-2 p-0 m-0'>
            {Object.keys(person).length? <Chats />:<EmptyChats />}
            </div>
          </div>
        </Box>
      </div>
      <div className="bg-zinc-300 h-screen">
        {/* Content for the second div */}
      </div>
    </div>
  );
}

export default ChatsDialog;
