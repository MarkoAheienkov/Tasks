import { NavLink } from 'react-router-dom';

import classes from './Link.module.css';

const Link = ({children, path, click}) => {
  console.log('[Link] work');
  return <li onClick={click} className={classes.ListItem}>
    <NavLink exact to={path} className={classes.Link} activeClassName={classes.Active}>
      {children}
    </NavLink>
  </li>;
};

export default Link;
