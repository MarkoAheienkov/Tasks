import Article from "../Article";

const Articles = ({articles}) => {
  return articles.map(({title, cover, id, article_id}) => {
    return <Article key={id} title={title} id={id || article_id} cover={cover}/>
  });
};

export default Articles;
