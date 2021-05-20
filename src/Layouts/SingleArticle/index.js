import classes from "./SingleArticle.module.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import Sections from "../../Components/SingleArticle/Sections";

const SingleArticle = () => {
  const {id} = useParams();

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  
  const getArticle = async (id) => {
    setIsLoading(true);
    const res = await axios.get(`/articles/${id}`);
    const post = res.data;
    console.log(post);
    setArticle(post);
    setIsLoading(false);
  };

  useEffect(() => {
    getArticle(id);
  }, [id]);



  return <section className='container'>
    
    {
      isLoading?
      null:
      <section className={classes.Article}>
        <h1 className={classes.Title}>{article.title}</h1>
        <Sections sections={article.sections}/>
      </section>
    }

    

  </section>;
};

export default SingleArticle;
