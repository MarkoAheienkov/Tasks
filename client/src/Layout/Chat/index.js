import { useEffect, useRef, useState } from "react";
import MessageForm from "../../Compoents/Chat/MessageForm";
import Messages from "../../Compoents/Chat/Messages";
import './chat.css';
import { useSelector } from "react-redux";
import useCustomChat from "../../Hooks/useCustomChat";
import { useHistory } from "react-router";

const Chat = () => {

  const history = useHistory();

  const notAllowed = () => {
    alert('You cant join this room, because room is full. Please, try again later.');
    history.push('/');
  };

  const { sendMessage, getMessages } = useCustomChat('first', notAllowed);
  const username = useSelector(state => state.username);
  const messages = useSelector(state => state.messages);
  const ulRef = useRef(null); 

  const [messageText, setMessageText] = useState('');

  const scroll = () => {
    ulRef.current.scroll({
      top: messages.length*200,
    });
  };
  
  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    scroll();
  });

  const submit = (event) => {
    event.preventDefault();
    sendMessage({
      messageText: messageText,
    })
    setMessageText('');
    scroll()
  };

  return <section className='container'>
    <Messages username={username} messages={messages} ulRef={ulRef}/>
    <MessageForm value={messageText} setMessageText={setMessageText} submit={submit}/>
  </section>;
};

export default Chat;
