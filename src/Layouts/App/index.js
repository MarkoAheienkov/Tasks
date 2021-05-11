import { useState } from 'react';
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
  const toggleSideBar = () => {
    if (isSidebarVisible) {
      hideSideBar();
    } else {
      showSideBar();
    }
  };
  const onSelectChange = ({value}) => {
    console.log(actionTypes);
    dispatch({type: actionTypes.CHANGE_USER, pivot: value});
  };
  return (
    <div className={classes.App}>
      <Header toggleClick={toggleSideBar} onSelectChange={onSelectChange}/>
      <Sidebar isShow={isSidebarVisible} hideSideBar={hideSideBar}/>
      <Backdrop isVisible={isSidebarVisible} click={hideSideBar}/>
      <Switch>
        <Route path="/" exact component={PostsLayout}/>
        <Route path="/articles" exact component={ArticlesLayout}/>
        <Route path="/posts/:id" exact component={SinglePost}/>
        <Route path="/articles/approve" exact component={ApproveArticles}/>
        <Route path="/articles/update/:id" exact component={UpdateArticle}/>
        <Route path="/articles/user" exact component={UserArticles}/>
        <Route path="/articles/all" exact component={AllArticles}/>
        {
          isAuth && <Route path="/articles/create" exact component={CreateArticle}/>
        }
        <Route path="/articles/:id" exact component={SingleArticle}/>

      </Switch>

    </div>
  );
}

export default App;
