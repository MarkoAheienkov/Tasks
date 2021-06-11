import { FaPaperPlane } from 'react-icons/fa';
import './MessageForm.css';


const MessageForm = ({submit, value, setMessageText}) => {
  const onChange = (event) => {
    setMessageText(event.target.value);
  };
  return (
    <form onSubmit={submit} className="message-box">
      <input onChange={onChange} value={value} autoComplete="off" id="message" type="text" className="message-box__input"/>
      <button className="message-box__send" type="submit">
        <FaPaperPlane/>
      </button>
    </form>);
};

export default MessageForm;
