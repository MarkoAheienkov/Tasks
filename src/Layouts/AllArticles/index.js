import axios from "../../Axios";
import { useEffect, useState } from "react";
import Articles from "../../Components/AllArticles/Articles";
import classes from "./AllArticles.module.css";
import { useHistory } from "react-router";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  const getArticles = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/articles`);
      const articles = res.data.articles;
      console.log(articles);
      setArticles(articles);
      setIsLoading(false);
    } catch (err) {
      console.log('[AllArticles, getArticles]', err);
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
      console.log('[AllArticles, removeArticle]', err);
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

export default AllArticles;
