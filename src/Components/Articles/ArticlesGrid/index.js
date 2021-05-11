import Article from "../Article";

const Articles = ({articles}) => {
  return articles.map(({title, cover, id}) => {
    return <Article key={id} title={title} id={id} cover={cover}/>
  });
};

export default Articles;
