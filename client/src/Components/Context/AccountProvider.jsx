import React from 'react'
import { createContext,useState,useRef,useEffect} from 'react';
import {io} from 'socket.io-client';
export const AccountContext=createContext(null);

function AccountProvider({children}) {
    const [account,setAccount]=useState();
    const [person,setPerson]=useState({});
    const [activeUsers,setActiveUsers]=useState([]);
    const [newMessageLag, setNewMessageLag] = useState(false); 
    const socket=useRef();
    useEffect(()=>{
      socket.current=io('ws://localhost:9000')
    },[])
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
        setNewMessageLag
      }}>
        {children}
      </AccountContext.Provider>
  )
}

export default AccountProvider