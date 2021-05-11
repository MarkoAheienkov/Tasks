import { Link } from "react-router-dom";
import Button from "../../UI/Button"

import classes from './Article.module.css';

const Article = ({title, id, remove, update}) => {
  const removeArticle = (event) => {
    event.preventDefault();
    remove(id);
  }
  const updateArticle = (event) => {
    event.preventDefault();
    update(id);
  }
  return <li className={classes.Article}>
    <Link to={`/articles/${id}`} className={classes.Link}>
      <h2>{title}</h2>
      <div className={classes.Actions}>
        <Button click={removeArticle} btnType="danger" type="button">Remove</Button>
        <Button click={updateArticle} btnType="warn" type="button">Update</Button>
      </div>
    </Link>
  </li>;
};

export default Article;
