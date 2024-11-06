import React from 'react';
import LoginDialog from "./Accounts/LoginDialog";
import ChatsDialog from './Chats/ChatsDialog';
import { useContext } from 'react';
import { AccountContext } from './Context/AccountProvider';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";



const Messenger = () => {
    const { account } = useContext(AccountContext);

    return (
        <Router>
            <Routes>
                {/* Redirect to chat if signed in, otherwise to login */}
                <Route path="/" element={account ? <Navigate to="/chat" /> : <Navigate to="/login" />} />
                <Route path="/login" element={account ? <Navigate to="/chat" /> : <LoginDialog />} />
                <Route path="/chat" element={account ? <ChatsDialog /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default Messenger;