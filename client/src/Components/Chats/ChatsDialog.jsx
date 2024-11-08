import { React, useContext } from 'react';
import Box from './Box';
import Menu from './Menu/Menu';
import EmptyChats from './Chat/EmptyChats';
import Chats from './Chat/Chats';
import { AccountContext } from '../Context/AccountProvider';

function ChatsDialog() {
  const { person } = useContext(AccountContext);

  return (
    <div
      className="h-[100vh]"
      style={{
        position: 'relative',
        backgroundImage:
          'url(https://img.freepik.com/free-photo/top-view-easter-background-with-copyspace_23-2148059781.jpg?t=st=1731005871~exp=1731009471~hmac=64c9e3d57986f2d1f0ccd3867bf29e140de9ad94bb6abfe3023c54550e297911&w=996)',
        backgroundSize: 'cover', // Ensures the image covers the available space without stretching
        backgroundPosition: 'center', // Centers the background image
        backgroundRepeat: 'no-repeat', // Prevents repeating the image
        backgroundAttachment: 'fixed', // Keeps the background fixed during scroll
      }}
    >
      <div
        className="h-[87%] "
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 999,
        }}
      >
        <Box width="205vh" backgroundColor="green" className="flex items-center">
          <div
            className="flex relative h-[105%]"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <div className="w-1/4  p-0 m-0">
              <Menu />
            </div>
            <div className="relative w-3/4  min-w-3 border-l-2 p-0 m-0">
              {Object.keys(person).length ? <Chats /> : <EmptyChats />}
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default ChatsDialog;
