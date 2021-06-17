import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import addDots from '../../../Helpers/addDots';
import shortText from '../../../Helpers/shortText';
import classes from "./Post.module.css";

const Post  = ({title, body, id, likes = 0}) => {
  const history = useHistory();
  const postClick = () => {
    history.push(`posts/${id}`);
  };
  let transformBody = body;
  if (transformBody.length > 100) {
    transformBody = addDots(shortText(body, 300), 3);
  }
  return <article onClick={postClick} className={classes.Post}>
    <div className={classes.Actions}>
      <AiOutlineUp className={classes.LineUp} size={32}/>
      {likes}
      <AiOutlineDown className={classes.LineDown} size={32}/>
    </div>
    
    <div className={classes.Content}>
      <h2 className={classes.Title}>{title}</h2>
      <p className={classes.Body}>{transformBody}</p>
    </div>

  </article>;
};

export default Post;
