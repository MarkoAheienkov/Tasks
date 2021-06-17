import Article from "../Article";

const Articles = ({articles, remove, approve, disapprove, update}) => {
  return articles.map(({id, article_id,  title}) => {
    return <Article 
              key={id}
              id={id || article_id}
              title={title}
              remove={remove}
              approve={approve}
              disapprove={disapprove}
              update={update}/>
  });
};

export default Articles;
