import classes from "./Comment.module.css";
import Button from "../../UI/Button"
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../Axios";
import Form from "../../Shared/Form";
import Comments from "../Comments";
import { useParams } from "react-router";

const Comment = ({text, id, comment_id}) => {
  const [isShowReplies, setIsShowreplies] = useState(false);
  const [isRepliesLoading, setIsRepliesLoading] = useState(false);
  const [replies, setReplies] = useState(null);
  const {id: postId} = useParams();

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

  const isAuth = useSelector((state) => state.isAuth);

  const getReplies = async () => {
    try {
      setIsRepliesLoading(true);

      const res = await axios.get(`/comments/replies/${id || comment_id}`);
      const replies = res.data.replies;
      setReplies(replies);
      setIsRepliesLoading(false);
    } catch (err) {
      console.log('[Comment, getReplies]', err);
    }
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
    try {
      const res = await axios.post(`/comments/replies/${id || comment_id}`, {
        text: addReplyForm.reply.value,
        postId,
      });
      const { reply } = res.data;
      const replyy = {
        text: reply.reply_id.text,
        id: reply.reply_id.comment_id,
        comment_id: reply.reply_id.comment_id,
      }
      const newReplies = [...replies];
      newReplies.push(replyy);
      setReplies(newReplies);
      const newAddReplyForm = {...addReplyForm};
      newAddReplyForm.reply={...newAddReplyForm.reply};
      newAddReplyForm.reply.value = '';
      setAddReplyForm(newAddReplyForm);
    } catch (err) {
      console.log('[Comment, getReplies]', err);
    }
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
