import axios from "../../Axios";
import { useEffect, useState } from "react";
import Articles from "../../Components/ApproveArticles/Articles";
import { useSelector } from "react-redux";
import classes from "./ApproveArticles.module.css";
import { useHistory } from "react-router";

const ApproveArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  const token = useSelector((state) => state.token);

  const getArticles = async () => {
    setIsLoading(true);
    const res = await axios.get(`/articles/not-approved?auth=${token}`);
    const articles = res.data.articles;
    console.log(articles);
    setArticles(articles);
    setIsLoading(false);
  };

  useEffect(() => {
    getArticles();
  }, []);

  const removeArticle = async (id) => {
    await axios.delete(`/articles/${id}?auth=${token}`);
    getArticles();
  };

  const approveArticle = async (id) => {
    await axios.patch(`/articles/approve/${id}?auth=${token}`);
    getArticles();
  };

  const disApproveArticle = async (id) => {
    await axios.delete(`/articles/disapprove/${id}?auth=${token}`);
    getArticles();
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
