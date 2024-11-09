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
    <>
    <div  onClick={()=> getUser()} className='flex h-[75px] py-[13px] px-[0] cursor-pointer items-center'>
        <div className='py-[13px] px-[17px] gap-2'>
            <img className="w-[50px] h-[50px] rounded-[50%]"src={user.picture} alt="img" />
        </div>

        <div className=" flex-col">
  <div className="flex items-center w-full">
    <Typography>{user.name}</Typography>
    <Typography className="absolute text-[12px] pl-[17%] text-zinc-300 mr-auto" sx={{marginLeft:'auto'}}>
      {message?.text && formatDate(message?.timestamp)}
    </Typography>
  </div>
  <Typography
    sx={{
      margin: '0',
      position: 'relative', // Maintain relative position
      paddingTop: '0.5%', // Optional: space from the top (if needed)
      overflowWrap: 'break-word',
      fontSize: '1rem', // Adjust font size
      lineHeight: '1.5', // Optional: adjust line height for readability
      width: 'fit-content', // Ensure width is based on content
    }}
  >
    {message?.text?.includes('localhost') ? 'media' : message.text}
  </Typography>
</div>



        </div>
        


  </>
  )
}

export default Conversation
