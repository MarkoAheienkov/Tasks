import Comment from "../Comment";

const Comments = ({comments}) => {
  return comments.map((comment) => {
    const {text, id, comment_id} = comment;
    return <Comment key={id || comment_id} id={id || comment_id} comment_id={comment_id} text={text}/>
  });
};

export default Comments;
