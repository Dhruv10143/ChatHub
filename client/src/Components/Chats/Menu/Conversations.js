import { useEffect, useState,useContext } from 'react';
import { getUsers } from '../../../Service/Api';
import Conversation from './Conversation';
import { AccountContext } from '../../Context/AccountProvider';
import Divider from '@mui/material/Divider';
import React from 'react';

const Conversations = ({text}) => {
  const [users, setUsers] = useState([]);
  const {account,socket,setActiveUsers,activeUsers}=useContext(AccountContext);

  useEffect(() => {
    const fetchData = async () => {
      let response = await getUsers();
      const filteredData=response.filter(user=>user.name.toLowerCase().includes(text.toLowerCase()));
      setUsers(filteredData); 
      
    };
    fetchData();
  }, [text]);

  useEffect(()=>{
          socket.emit('addUsers',account);
          socket.on("getUsers",users=>{
              setActiveUsers(users);
          })
    },[account]
  )

  useEffect(() => { 
    socket.on("newDevice", ({user, sockId}) => {
      setActiveUsers([...activeUsers, {user, sockId}])
    })
  }, [socket])

  return (
    <div className='h-81vh overflow-auto'>
  {
    users.map(user => (
      user.sub !== account.sub && (
        <React.Fragment key={user.sub}> {/* Add a unique key here */}
          <Conversation user={user} />
          <Divider
            sx={{
              marginLeft: '70px', 
              backgroundColor: '#e9edef', 
              opacity: 0.6 
            }}
          />
        </React.Fragment>
      )
    ))
  }
</div>

  );
};

export default Conversations;
