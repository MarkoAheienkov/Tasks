import axios from "../../Axios";
import { useEffect, useState } from "react";
import Articles from "../../Components/AllArticles/Articles";
import { useSelector } from "react-redux";
import classes from "./UserArticles.module.css";
import { useHistory } from "react-router";

const UserArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  const getArticles = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/articles/user`);
      const articles = res.data.articles;
      console.log(articles);
      setArticles(articles);
      setIsLoading(false);
    } catch (err) {
      console.log('[UserArticles, getArticles]', err);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  const removeArticle = async (id) => {
    try {
      await axios.delete(`/articles/${id}`);
      getArticles();
    } catch (err) {
      console.log('[UserArticles, removeArticle]', err);
    }
  };

  const updateArticle = (id) => {
    history.push(`/articles/update/${id}`);
  };

  return <section className="container">
    <ul className={classes.Articles}>
      {
        isLoading?
        null:
        <Articles 
            articles={articles}
            update={updateArticle}
            remove={removeArticle}
            />
      }
    </ul>
  </section>;
};

export default UserArticles;
