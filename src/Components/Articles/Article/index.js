import { Link } from 'react-router-dom';
import classes from './Article.module.css';

const Article = ({id, title, cover='https://upload.wikimedia.org/wikipedia/commons/f/f5/3-ball_Columns.gif'}) => {
  return <Link to={`/articles/${id}`} className={classes.Article}>
    <article>
      <div className={classes.ImageContainer}>
        <img src={cover} alt={title}/>    
      </div>
      <h2>{title}</h2>
  </article>
  </Link>;
};

export default Article;
