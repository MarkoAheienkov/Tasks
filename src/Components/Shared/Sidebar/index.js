import { useSelector } from 'react-redux';
import Links from './Links';
import classes from './Sidebar.module.css';

const Sidebar = ({isShow, hideSideBar}) => {
  const links = [
    {
      path: '/',
      content: 'Posts',
    },
    {
      path: '/articles',
      content: 'Articles',
    },
  ];
  const isAuth = useSelector((state) => state.isAuth);
  const isAdmin = useSelector((state) => state.isAdmin);
  const username = useSelector((state) => state.username);
  if (isAuth) {
    links.push(
      {
        path: '/articles/create',
        content: 'Create Article',
      },
      {
        path: '/articles/user',
        content: 'Your Articles',
      },
    );
  } else {
    links.push(
      {
        path: '/auth/sign-up',
        content: 'Sign Up',
      },
      {
        path: '/auth/sign-in',
        content: 'Login',
      },
    );
  }
  if (isAdmin) {
    links.push(
      {
        path: '/articles/approve',
        content: 'Articles To Approve',
      },
      {
        path: '/articles/all',
        content: 'All Articles',
      },
    );
  }
  const sideBarClasses = [classes.Sidebar];
  if (isShow) {
    sideBarClasses.push(classes.Show);
  }
  return <div className={sideBarClasses.join(' ')}>
    <div className={classes.Greetings}>
      <h2>Hi, {username}!</h2>
    </div>
    <ul className={classes.Links}>
      <Links links={links} click={hideSideBar}></Links>
    </ul>
  </div>;
};

export default Sidebar;
