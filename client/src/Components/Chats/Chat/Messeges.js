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

  // Send a message
  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      const message = {
        senderId: account.sub,
        receiverId: person.sub,
        conversationId: conversation._id,
        type: file ? 'file' : 'text',
        text: file ? img : value,
      };

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

    socket.current?.on("getMessage", handleIncomingMessage);

    // Cleanup listener on component unmount
    return () => {
      socket.current?.off("getMessage", handleIncomingMessage);
    };
  }, [socket, conversation._id]);

  return (
    <div>
      <div className="bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-cover bg-center h-[46.8rem] w-full flex flex-col overflow-y-auto">
        {messages.map((message, index) => (
          <div className='py-[1px] px-[80px]' key={message._id || index}>
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
