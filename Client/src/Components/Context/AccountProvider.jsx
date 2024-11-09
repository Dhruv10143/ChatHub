import React from 'react'
import { createContext,useState,useRef,useEffect, useContext} from 'react';
import {io} from 'socket.io-client';
import { useMemo } from 'react';
export const AccountContext=createContext(null);

function AccountProvider({children}) {
    const [account,setAccount]=useState();
    const [person,setPerson]=useState({});
    const [activeUsers,setActiveUsers]=useState([]);
    const [newMessageLag, setNewMessageLag] = useState(false); 
    const socket = useMemo(() => io("http://localhost:9000"), []);
    const [incoming, setIncoming] = useState(false);
    const [callerSignal, setCallerSignal] = useState();
    const [callerinfo, setCallerinfo] = useState();

    useEffect(() => {
      socket.on("callUser", (data) => {
        setIncoming(true);
        setCallerinfo(data.from);
        setCallerSignal(data.signal);
      });
      return()=>{
        socket.off("callUser");
      }
    }, [socket]);
    
  return (
      <AccountContext.Provider value={{
        account,
        setAccount,
        person,
        setPerson,
        socket,
        activeUsers,
        setActiveUsers,
        newMessageLag,
        setNewMessageLag,
        incoming,
        setIncoming,
        callerSignal,
        callerinfo
      }}>
        {children}
      </AccountContext.Provider>
  )
}

export default AccountProvider