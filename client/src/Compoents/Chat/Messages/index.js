import Message from "../Message";
import './Messages.css'

const Messages = ({messages = []}) => {
  return <ul className='messages'>
    {messages.map(({text, _id, author, isSender, date}) => {
      return <Message
              key={_id}
              text={text}
              isSender={isSender}
              author={author}
              date={date}/>;
    })}
  </ul>;
};

export default Messages;
