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
    // const socket=useRef();
    // useEffect(()=>{
    //   socket.current=io('ws://localhost:9000')
    //   socket.current.emit("emitData", account);
    // },[account])
    

    // useEffect(() => {
    //   socket
    // }, [socket])
    
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