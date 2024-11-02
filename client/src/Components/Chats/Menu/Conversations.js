import { useEffect, useState,useContext } from 'react';
import { getUsers } from '../../../Service/Api';
import Conversation from './Conversation';
import { AccountContext } from '../../Context/AccountProvider';
import Divider from '@mui/material/Divider';

const Conversations = ({text}) => {
  const [users, setUsers] = useState([]);
  const {account,socket,setActiveUsers}=useContext(AccountContext);

  useEffect(() => {
    const fetchData = async () => {
      let response = await getUsers();
      const filteredData=response.filter(user=>user.name.toLowerCase().includes(text.toLowerCase()));
      setUsers(filteredData); 
      
    };
    fetchData();
  }, [text]);

  useEffect(()=>{
          socket.current.emit('addUsers',account);
          socket.current.on("getUsers",users=>{
              setActiveUsers(users);
          })

    },[account]
  )
 

  return (
    <div className='h-81vh overflow-auto'>
      {
        users.map(user=>(
          
          user.sub!=account.sub &&
          <>
          <Conversation user={user} />
          <Divider
        sx={{
          marginLeft: '70px', 
          backgroundColor: '#e9edef', 
          opacity:0.6 
        }}
      />
          </>
        ))
      }
    </div>
  );
};

export default Conversations;
