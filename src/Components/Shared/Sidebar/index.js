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
  const token = useSelector((state) => state.token);
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
  }
  if (token === 'admin') {
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
      <h2>Hi, guest!</h2>
    </div>
    <ul className={classes.Links}>
      <Links links={links} click={hideSideBar}></Links>
    </ul>
  </div>;
};

export default Sidebar;
