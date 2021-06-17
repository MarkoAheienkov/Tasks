import Post from '../Post';

const Posts = ({posts}) => {
  return posts.map(({title, body, id, post_id}) => {
    return <Post title={title} body={body} id={id | post_id} key={id}/>;
  });
};

export default Posts;
