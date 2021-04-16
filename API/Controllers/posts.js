const Post = require('../Models/post');

const getPostsFromTo = async (page, limit) => {
  if (isNaN(page) || isNaN(limit)) {
    const err = new Error();
    err.status = 400;
    err.message = 'Page and Limit must be numbers';
    throw err;
  }
  const from = (page-1)*limit;
  const to = page*limit;
  return await Post.getFromTo(from, to);
};

const getPosts = async (req, res, next) => {
  const {page, limit} = req.query;
  let posts;
  try {
    if (page && limit) {
      posts = await getPostsFromTo(page, limit);
    } else {
      posts = await Post.getAll();
    }
  } catch (err) {
    return next(err);
  }
  return res.json(posts);
};

const getPostsCount = async (req, res, next) => {
  try {
    const count = await Post.getCount();
    return res.json({count: count});
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPosts,
  getPostsCount,
};
