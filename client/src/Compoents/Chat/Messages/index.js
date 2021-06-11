import Message from "../Message";
import './Messages.css'

const Messages = ({messages = [], username, ulRef}) => {

  return <ul ref={ulRef} className='messages'>
    {messages.map(({text, _id, author, createdAt}) => {
      return <Message
              key={_id}
              text={text}
              isSender={author === username}
              author={author}
              createdAt={createdAt}/>;
    })}
  </ul>;
};

export default Messages;
