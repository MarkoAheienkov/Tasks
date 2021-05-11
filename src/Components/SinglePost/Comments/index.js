import Comment from "../Comment";

const Comments = ({comments}) => {
  return comments.map(({text, id}) => {
    return <Comment key={id} id={id} text={text}/>
  });
};

export default Comments;
