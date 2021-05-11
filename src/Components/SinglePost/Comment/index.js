import classes from "./Comment.module.css";
import Button from "../../UI/Button"
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../Axios";
import Form from "../../Shared/Form";
import Comments from "../Comments";

const Comment = ({text, id}) => {
  const [isShowReplies, setIsShowreplies] = useState(false);
  const [isRepliesLoading, setIsRepliesLoading] = useState(false);
  const [replies, setReplies] = useState(null);

  console.log('Comment', id)

  const [addReplyForm, setAddReplyForm] = useState({
    reply: {
      label: 'Reply',
      value: '',
      placeholder: 'Write yout reply...',
      validators: [],
      isTouched: false,
      isValid: false,
      type: 'textarea',
    }
  });

  const token = useSelector((state) => state.token);
  const isAuth = useSelector((state) => state.isAuth);

  const getReplies = async () => {
    setIsRepliesLoading(true);
    const res = await axios.get(`/comments/replies/${id}`);
    const replies = res.data.replies;
    console.log(replies);
    setReplies(replies);
    setIsRepliesLoading(false);
  };

  const toggleReplies = () => {
    if (!isShowReplies) {
      setIsShowreplies(true);
      getReplies();
    }
    else {
      setReplies(null);
      setIsShowreplies(false);
    }
  };

  const submit = async () => {
    await axios.post(`/comments/replies/${id}?auth=${token}`, {
      text: addReplyForm.reply.value,
    });
  };
  
  return <section className={classes.Comment}>
    <p className={classes.Text}>{text}</p>
    <Button click={toggleReplies} type="btn" btnType="inline-primary">{isShowReplies? 'Hide Replies': 'Show Replies'}</Button>
    {
      isShowReplies&&!isRepliesLoading?
      <Comments comments={replies}/>:
      null
    }
    {
      isAuth && isShowReplies?
      <Form config={addReplyForm} setConfigChange={setAddReplyForm} onSubmit={submit}>
        <Button type="submit" btnType="primary">Add Reply</Button>
      </Form>:
      null
    }
  </section>;
};

export default Comment;
