const Post = require('../Models/post');

const getPosts = async (req, res, next) => {
  const {page, limit} = req.query;
  let posts;
  if (page && limit) {
    const from = (page-1)*limit;
    const to = page*limit;
    posts = await Post.getFromTo(from, to);
  } else {
    posts = await Post.getAll();
  }
  return res.json(posts);
};

module.exports = {
  getPosts,
};
