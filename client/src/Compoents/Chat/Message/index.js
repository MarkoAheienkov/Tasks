import dateToTime from '../../../Helpers/dateToTime';
import './Message.css';

const Message = ({isSender, author, text, createdAt}) => {
  const messageContainerclassNamees = ['message-container'];
  if (isSender) {
    messageContainerclassNamees.push('message-user');
  } else {
    messageContainerclassNamees.push('message-speaker');
  }
  return (
    <li className={messageContainerclassNamees.join(' ')}>
      <div className="message">
        <small className="message__author">{author}</small>
        <p className="message__text">{text}</p>
        <small className="message__time">{dateToTime(createdAt)}</small>
      </div>
    </li>);
};

export default Message;
