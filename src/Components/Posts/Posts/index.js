import Post from '../Post';

const Posts = ({posts}) => {
  return posts.map(({title, body, id}) => {
    return <Post title={title} body={body} id={id} key={id}/>;
  });
};

export default Posts;
