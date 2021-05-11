import PostLoader from "../PostLoader";

const PostLoaders = ({count}) => {
  const postLoaders = [];
  for (let i = 0; i < count; i++) {
    postLoaders.push(<PostLoader key={i}/>);
  }
  return postLoaders;
};

export default PostLoaders;
