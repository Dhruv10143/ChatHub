import React from 'react';
import LoginDialog from "./Accounts/LoginDialog";
import ChatsDialog from './Chats/ChatsDialog';
import { useContext } from 'react';
import { AccountContext } from './Context/AccountProvider';
import { Route,Router } from 'react-router-dom';



const Messenger = () => {
    const {account}=useContext(AccountContext);
    return (
        account?<ChatsDialog/>:

        <div style={{ position: 'relative' }}>
            <div className="bg-emerald-300 h-64">
                {/* Content for the first div */}
            </div>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 999 }}>
                <LoginDialog />
            </div>
            <div className="bg-zinc-300 h-screen">
                {/* Content for the second div */}
            </div>
            
        </div>
    );
};

export default Messenger;