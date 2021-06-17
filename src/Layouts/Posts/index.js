import axios from "../../Axios";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Posts from "../../Components/Posts/Posts";
import Form from "../../Components/Shared/Form"
import Button from "../../Components/UI/Button";
import PostLoaders from "../../Components/Posts/PostsLoader";
import Searching from "../../Components/UI/Searching";

const PostsLayout = () => {
  const [addPostConfigForm, setAddPostConfigForm] = useState({
    title: {
      value: '',
      placeholder: 'Post title...',
      type: 'text',
      isTouched: false,
      isValid: false,
      validators: [],
      label: 'Title',
    },
    body: {
      value: '',
      placeholder: 'Post text...',
      type: 'textarea',
      isTouched: false,
      isValid: false,
      validators: [],
      label: 'Text',
    }
  });

  const isAuth = useSelector((state) => state.isAuth);

  const [isLoading, setIsLoading] = useState(true);

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('/posts');
      const data = res.data;
      setPosts(data.posts);
      setIsLoading(false);
    } catch (err) {
      console.log('[PostsLayout, getPosts]', err);
    }
  };

  const getPostsBySearch = async (searchValue) => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/posts?search=${searchValue}`);
      const data = res.data;
      setPosts(data.posts);
      setIsLoading(false);
    } catch (err) {
      console.log('[PostsLayout, getPostsBySearch]', err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const clearValue = (field) => {   
    setAddPostConfigForm((addPostConfigForm) => {
      const newAddPostConfigForm = {...addPostConfigForm};
      newAddPostConfigForm[field] = {...newAddPostConfigForm[field]};
      newAddPostConfigForm[field].value = '';
      return newAddPostConfigForm;
    });
  };

  const onSubmit = async () => {
    try {
      const body = {
        title: addPostConfigForm.title.value,
        body: addPostConfigForm.body.value,
      }
      const res = await axios.post(`/posts`, body);
      const data = res.data;
      const post = data.post;
      clearValue('title');
      clearValue('body');
      const newPosts = [...posts];
      newPosts.push(post);
      setPosts(newPosts);
    } catch (err) {
      console.log('[PostsLayout, onSubmit]', err);
    }
  };

  const search = (value) => {
    getPostsBySearch(value);
  }

  return <section className="container">

    <Searching search={search} delay={500} placeholder={'Search by title'}/>

    {
      isAuth?
      <Form onSubmit={onSubmit} config={addPostConfigForm} setConfigChange={setAddPostConfigForm}>
        <Button type="submit" btnType="primary">Add Post</Button>
      </Form>:
      null
    }
    
    {
      isLoading?
      <PostLoaders count={20}/>:
      <Posts posts={posts}/>
    }
  </section>;
};

export default PostsLayout;
