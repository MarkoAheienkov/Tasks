import classes from "./PostLoader.module.css";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const PostLoader = () => {
  return <article className={classes.Post}>
    <div className={classes.Actions}>
      <AiOutlineUp className={classes.LineUp} size={32}/>
      {0}
      <AiOutlineDown className={classes.LineDown} size={32}/>
    </div>
    <div className={classes.Content}>
      <div className={ classes.Title + ' ' + classes.LoadWraper}>
        <div className={classes.Activity}></div>
      </div>
      <div className={classes.Body + ' ' + classes.LoadWraper}>
        <div className={classes.Activity}></div>
      </div>
      <div className={classes.Body + ' ' + classes.LoadWraper}>
        <div className={classes.Activity}></div>
      </div>
      <div className={classes.Body + ' ' + classes.LoadWraper}>
        <div className={classes.Activity}></div>
      </div>
      {/* <div className={classes.LoadWraper}></div>
      <div className={classes.LoadWraper}></div> */}
    </div>
  </article>;
};

export default PostLoader;
