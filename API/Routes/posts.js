const {Router} = require('express');
const postsController = require('../Controllers/posts');

const router = Router();

router.get('/', postsController.getPosts);

module.exports = router;
