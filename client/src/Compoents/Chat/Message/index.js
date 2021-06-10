import './Message.css';

const Message = ({isSender, author, text, date}) => {
  const messageContainerClasses = ['message-container'];
  if (isSender) {
    messageContainerClasses.push('message-user');
  } else {
    messageContainerClasses.push('message-speaker');
  }
  return (
    <li class={messageContainerClasses.join(' ')}>
      <div class="message">
        <small class="message__author">{author}</small>
        <p class="message__text">{text}</p>
        <small class="message__time">{date}</small>
      </div>
    </li>);
};

export default Message;
