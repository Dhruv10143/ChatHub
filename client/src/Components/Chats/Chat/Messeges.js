import React, { useState, useEffect, useContext, useRef } from 'react';
import Footer from './Footer';
import Message from './Message';
import { AccountContext } from '../../Context/AccountProvider';
import { getMessage, newMessage } from '../../../Service/Api';

const Messages = ({ person, conversation }) => {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  
  const [file, setFile] = useState();
  const [img, setImg] = useState('');
  const[incomingMessage,setIncomingMessage]=useState(null);
  const scrollRef=useRef();
  const { account, socket,newMessageLag,setNewMessageLag } = useContext(AccountContext);

  // Fetch messages whenever conversation or person changes
  useEffect(() => {
    const getConversationDetails = async () => {
      try {
        const data = await getMessage(conversation._id);
        if (data) setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    if (conversation?._id) getConversationDetails();
  }, [person._id, conversation._id, newMessageLag]);
  // useEffect(()=>{
  //   scrollRef.current?.scrollIntoView({transition:"smooth"})
  // },[messages]);
  useEffect(()=>{
      if(incomingMessage && conversation?.members?.includes(incomingMessage.senderId)){
           setMessages(prev=>[...prev,incomingMessage]);
           Notification.requestPermission();
           new Notification("New Message",{
            body:incomingMessage.text
           })
          }
  },[incomingMessage,conversation])

  // Send a message
  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if (code === 13 && socket) {
      const message = {
        senderId: account.sub,
        receiverId: person.sub,
        conversationId: conversation._id,
        type: file ? 'file' : 'text',
        text: file ? img : value,
      };

      socket.emit('sendMessage', message);

      await newMessage(message);
      setValue('');
      setFile(null);
      setImg('');
      setNewMessageLag(prev => !prev); // Trigger re-fetch of messages
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    const handleIncomingMessage = (data) => {
      if (data.conversationId === conversation._id) {
        setMessages((prev) => [...prev, { ...data, createdAt: Date.now() }]);
        
      }
    };

    socket.on("getMessage", handleIncomingMessage);

    // Cleanup listener on component unmount
    return () => {
      socket.off("getMessage", handleIncomingMessage);
    };
  }, [socket, conversation._id]);

  return (
    <div style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Black with 60% transparency
        borderRadius: '5px', // Rounded corners
        overflow: 'hidden', // Ensures content fits within rounded edges
      }}>
      <div className=" bg-cover bg-center h-[49.5rem] w-full flex flex-col overflow-y-auto">
        {messages.map((message, index) => (
          <div className='py-[1px] px-[80px]' ref={scrollRef} key={message._id || index}>
            <Message message={message} />
          </div>
        ))}
      </div>
      <div>
        <Footer sendText={sendText} setValue={setValue} value={value} file={file} setFile={setFile} setImg={setImg} />
      </div>
    </div>
  );
};

export default Messages;