import { Link } from "react-router-dom";
import Button from "../../UI/Button"

import classes from './Article.module.css';

const Article = ({title, id, remove, approve, disapprove, update}) => {
  const removeArticle = (event) => {
    event.preventDefault();
    remove(id);
  }
  const updateArticle = (event) => {
    event.preventDefault();
    update(id);
  }
  const approveArticle = (event) => {
    event.preventDefault();
    approve(id);
  }
  const disapproveArticle = (event) => {
    event.preventDefault();
    disapprove(id);
  }
  return <li className={classes.Article}>
    <Link to={`/articles/${id}`} className={classes.Link}>
      <h2 className={classes.Title}>{title}</h2>
      <div className={classes.Actions}>
        <Button click={removeArticle} btnType="danger" type="button">Remove</Button>
        <Button click={updateArticle} btnType="warn" type="button">Update</Button>
        <Button click={approveArticle} btnType="success" type="button">Approve</Button>
        <Button click={disapproveArticle} btnType="danger" type="button">Disapprove</Button>
      </div>
    </Link>
  </li>;
};

export default Article;
