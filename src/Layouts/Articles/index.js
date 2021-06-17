import axios from "../../Axios";
import { useEffect, useState } from "react";
import Articles from "../../Components/Articles/ArticlesGrid";

import classes from './Articles.module.css';

const ArticlesLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('/articles');
      const {articles} = res.data;
      setArticles(articles);
      setIsLoading(false);
    } catch (err) {
      console.log('[ArticlesLayout, getData]', err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return <>

    <section className='container'>
      <div className={classes.Grid}>
        {
          isLoading?
          null:
          <Articles articles={articles}/>
        }
      </div>
    </section>
  </>;
};

export default ArticlesLayout;
