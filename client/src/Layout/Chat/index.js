import { useEffect, useState } from "react";
import MessageForm from "../../Compoents/Chat/MessageForm";
import Messages from "../../Compoents/Chat/Messages";
import io from 'socket.io-client';
import './chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      author: 'marko',
      isSender: true,
      date: '13:10',
      text: 'Hi!',
    },
    {
      _id: 2,
      author: 'no marko',
      isSender: false,
      date: '13:15',
      text: 'Hi! How are you?',
    },
    {
      _id: 3,
      author: 'no marko',
      isSender: false,
      date: '14:10',
      text: 'Have you finished your task?',
    }
  ]);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:4000');
    setSocket(newSocket);
  }, []);

  const submit = (event) => {
    event.preventDefault();
    if (socket) {
      const message = {
        text: event.target.value,
        createdAt: new Date(),
        author: 'murko',
      };
      socket.emit('message', message);
    }
  };
  return <section className='container'>
    <Messages messages={messages}/>
    <MessageForm submit={submit}/>
  </section>;
};

export default Chat;
