import { FaPaperPlane } from 'react-icons/fa';
import './MessageForm.css';


const MessageForm = ({submit}) => {
  return (
    <form onSubmit={submit} className="message-box">
      <input autocomplete="off" id="message" type="text" className="message-box__input"/>
      <button className="message-box__send" type="submit">
        <FaPaperPlane/>
      </button>
    </form>);
};

export default MessageForm;
