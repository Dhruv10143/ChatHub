import React, { useContext,useEffect,useState} from 'react'
import Typography from '@mui/material/Typography';
import { AccountContext } from '../../Context/AccountProvider';
import { setConversation,getConversation } from '../../../Service/Api';
import { formatDate } from '../../../utils/common_utils';

const Conversation=({user})=> {
  const {setPerson,account,newMessageLag} =useContext(AccountContext);
  const[message,setMessage]=useState({});
  useEffect(()=>{
    const getConversationDetails=async()=>{
      const data=await getConversation({senderId:account.sub,receiverId:user.sub});
      setMessage({text:data?.message,timestamp:data?.updatedAt});

    }
    getConversationDetails();
  },[newMessageLag])
  const getUser=async()=>{
    setPerson(user);
    await setConversation({senderId:account.sub,receiverId:user.sub})

  }
  return (
    <div  onClick={()=> getUser()}className='flex h-[75px] py-[13px] px-[0] cursor-pointer items-center'>
        <div className='py-[13px] px-[17px] gap-2'>
            <img className="w-[50px] h-[50px] rounded-[50%]"src={user.picture} alt="img" />
        </div>
        <div className='flex'>
            <Typography> {user.name}</Typography>
            {
              message?.text && 
              <div className='text-[12px] ml-auto text-zinc-300'><Typography >{formatDate(message?.timestamp)}</Typography></div> 
            }
        </div>
        <div>
          <Typography>{message?.text?.includes('localhost')?'media':message.text}</Typography>
        </div>
    </div>
  )
}

export default Conversation
