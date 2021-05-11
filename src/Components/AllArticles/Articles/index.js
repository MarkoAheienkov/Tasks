import Article from "../Article";

const Articles = ({articles, remove, update}) => {
  return articles.map(({id, title}) => {
    return <Article 
              key={id}
              id={id}
              title={title}
              remove={remove}
              update={update}/>
  });
};

export default Articles;
