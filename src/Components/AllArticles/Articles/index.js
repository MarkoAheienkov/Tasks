import Article from "../Article";

const Articles = ({articles, remove, update}) => {
  return articles.map(({id, title, article_id}) => {
    return <Article 
              key={id || article_id}
              id={id || article_id}
              title={title}
              remove={remove}
              update={update}/>
  });
};

export default Articles;
