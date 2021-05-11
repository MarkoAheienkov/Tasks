import Link from './Link';

const Links = ({links, click}) => {
  return links.map(({content, path}) => {
    return <Link key={path} click={click} path={path}>{content}</Link>;
  });
};

export default Links;
