import classes from "./SinglePost.module.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import Form from "../../Components/Shared/Form";
import Button from "../../Components/UI/Button";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useSelector } from "react-redux";
import Comments from "../../Components/SinglePost/Comments";

const SinglePost = () => {
  const {id} = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);

  const isAuth = useSelector((state) => state.isAuth);

  const [addCommentForm, setAddCommentForm] = useState({
    comment: {
      label: 'Comment',
      value: '',
      placeholder: 'Write yout comment...',
      validators: [],
      isTouched: false,
      isValid: false,
      type: 'textarea',
    }
  });

  const submit = async () => {
    try {
      const res = await axios.post(`/comments/${id}`, {
        text: addCommentForm.comment.value,
      });
      const { comment } = res.data;
      const newComments = [...comments];
      newComments.push(comment);
      setComments(newComments);
      const newAddCommentForm = {...addCommentForm};
      newAddCommentForm.comment={...newAddCommentForm.comment};
      newAddCommentForm.comment.value = '';
      setAddCommentForm(newAddCommentForm);
    } catch (err) {
      console.log('[SinglePost, submit]', err);
    }
  };

  const getPost = async (id) => {
    try {
      setIsPostsLoading(true);
      const res = await axios.get(`/posts/${id}`);
      const post = res.data;
      setPost(post);
      setIsPostsLoading(false);
    } catch (err) {
      console.log('[SinglePost, getPost]', err);
    }
  };

  const getComments = async (id) => {
    try {
      setIsCommentsLoading(true);
      const res = await axios.get(`/comments/${id}`);
      const {comments} = res.data;
      setComments(comments);
      setIsCommentsLoading(false);
    } catch (err) {
      console.log('[SinglePost, getComments]', err);
    }
  }

  useEffect(() => {
    getPost(id);
    getComments(id);
  }, [id]);

  return <section className='container'>
    
    {
      isPostsLoading?
      null:
      <section className={classes.Post}>
        <div className={classes.Actions}>
          <AiOutlineUp className={classes.LineUp} size={36}/>
          <span className={classes.Likes}>{0}</span>
          <AiOutlineDown className={classes.LineDown} size={36}/>
        </div>
        <div className={classes.Content}>
          <h1 className={classes.Title}>{post.title}</h1>
          <p className={classes.Body}>{post.body}</p>
        </div>
      </section>
    }
    {
      isAuth?
      <Form config={addCommentForm} setConfigChange={setAddCommentForm} onSubmit={submit}>
        <Button type="submit" btnType="primary">Add Comment</Button>
      </Form>:
      null
    }
    {
      isCommentsLoading?
      null:
      <Comments comments={comments}/>
    }

  </section>;
};

export default SinglePost;
