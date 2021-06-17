import axios from '../../Axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from '../../Components/Shared/Header';
import Sidebar from '../../Components/Shared/Sidebar';
import Backdrop from '../../Components/UI/Backdrop';
import actionTypes from '../../store/actionTypes';
import AllArticles from '../AllArticles';
import ApproveArticles from '../ApproveArticles';
import ArticlesLayout from '../Articles';
import CreateArticle from '../CreateArticle';
import PostsLayout from '../Posts';
import SignUp from '../SignUp';
import SignIn from '../SingIn';
import SingleArticle from '../SingleArticle';
import SinglePost from '../SinglePost';
import UpdateArticle from '../UpdateArticle';
import UserArticles from '../UserArticles';

import classes from './App.module.css';


function App() {
  const [isSidebarVisible, setIsSideBarVisible] = useState(false);
  const isAuth = useSelector((state) => state.isAuth);
  const dispatch = useDispatch();
  const hideSideBar = () => {
    setIsSideBarVisible(false);
  };
  const showSideBar = () => {
    setIsSideBarVisible(true);
  };
  const setUserInfo = async () => {
    try {
      const res = await axios.get('/auth/user');
      const {email, username, isAdmin} = res.data;
      dispatch({ type: actionTypes.SET_AUTH_TRUE });
      dispatch({ type: actionTypes.SET_USER, pivot: { email, username, isAdmin } });
    } catch(err) {
      dispatch({ type: actionTypes.SET_AUTH_FALSE });
      dispatch({ type: actionTypes.CLEAR_USER });
    }
  };
  useEffect(() => {
    setUserInfo();
  },[])
  const toggleSideBar = () => {
    if (isSidebarVisible) {
      hideSideBar();
    } else {
      showSideBar();
    }
  };
  return (
    <div className={classes.App}>
      <Header toggleClick={toggleSideBar}/>
      <Sidebar isShow={isSidebarVisible} hideSideBar={hideSideBar}/>
      <Backdrop isVisible={isSidebarVisible} click={hideSideBar}/>
      <Switch>
        
        <Route path="/" exact component={PostsLayout}/>
        <Route path="/articles" exact component={ArticlesLayout}/>
        <Route path="/posts/:id" exact component={SinglePost}/>
        {
          !isAuth && <>
          <Route path="/auth/sign-up" exact component={SignUp}/>
          <Route path="/auth/sign-in" exact component={SignIn}/>
          <Route path="/articles/:id" exact component={SingleArticle}/>
          </>
        }
        {
          isAuth && <>
          <Route path="/articles/create" exact component={CreateArticle}/>
          <Route path="/articles/user" exact component={UserArticles}/>
          <Route path="/articles/all" exact component={AllArticles}/>
          <Route path="/articles/approve" exact component={ApproveArticles}/>
          <Route path="/articles/update/:id" exact component={UpdateArticle}/>
          <Route path="/articles/:id" exact component={SingleArticle}/>
          </>
        }
      </Switch>

    </div>
  );
}

export default App;
