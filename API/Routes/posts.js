const {Router: routerCreator} = require('express');
const postsController = require('../Controllers/posts');

const router = routerCreator();

router.get('/', postsController.getPosts);

router.get('/count', postsController.getPostsCount);

module.exports = router;
