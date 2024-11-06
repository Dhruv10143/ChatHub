 import {React,useContext, useEffect,useState} from 'react'
 import ChatsHeader from './ChatsHeader'
 import Messeges from './Messeges'
 import { AccountContext } from '../../Context/AccountProvider'
 import { getConversation } from '../../../Service/Api'
 
 const Chats=()=> {
  const[conversation,setConversation]=useState([]);
  const {person,account}=useContext(AccountContext);
  useEffect(()=>{
  const getConversationDetails=async()=>{
    let data=await getConversation({senderId:account.sub,receiverId:person.sub})
    setConversation(data);

  }
  getConversationDetails();
},[person.sub]);
   return (
     <div>
            <ChatsHeader person={person} />
            <Messeges  person={person} conversation={conversation}/>
     </div>
   )
 }
 
 export default Chats