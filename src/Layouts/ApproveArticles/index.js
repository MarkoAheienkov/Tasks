import axios from "../../Axios";
import { useEffect, useState } from "react";
import Articles from "../../Components/ApproveArticles/Articles";
import classes from "./ApproveArticles.module.css";
import { useHistory } from "react-router";

const ApproveArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  const getArticles = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/articles/not-approved`);
      const articles = res.data.articles;
      setArticles(articles);
      setIsLoading(false);
    } catch (err) {
      console.log('[ApproveArticles, getArticles]', err);
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
      console.log('[ApproveArticles, removeArticle]', err);
    }
  };

  const approveArticle = async (id) => {
    try {
      await axios.patch(`/articles/approve/${id}`);
      getArticles();
    } catch (err) {
      console.log('[ApproveArticles, approveArticle]', err);
    }
  };

  const disApproveArticle = async (id) => {
    try {
      await axios.delete(`/articles/disapprove/${id}`);
      getArticles();
    } catch (err) {
      console.log('[ApproveArticles, approveArticle]', err);
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
            disapprove={disApproveArticle}
            approve={approveArticle}
            />
      }
    </ul>
  </section>;
};

export default ApproveArticles;
