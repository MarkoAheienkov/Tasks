const path = require('path');
const fs = require('fs/promises');

const pathToFile = path.resolve(__dirname, '..', 'db.json');

/**
 * Post Model
 */
class Post {
  /**
   * Get all posts
   * @return {Promise<posts[]>}
   */
  static async getAll() {
    const data = await fs.readFile(pathToFile, 'utf-8');
    return JSON.parse(data);
  }
  /**
   * Get posts from ... to ...
   * @param {number} from - from post
   * @param {number} to - to post
   * @return {Promise<posts[]>}
   */
  static async getFromTo(from, to) {
    const posts = await Post.getAll();
    return posts.slice(from, to);
  }
  /**
   * Get count of posts
   * @return {Promise<number>}
   */
  static async getCount() {
    const posts = await Post.getAll();
    return posts.length;
  }
}

module.exports = Post;
