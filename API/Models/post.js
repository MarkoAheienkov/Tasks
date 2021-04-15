const path = require('path');
const fs = require('fs/promises');

const pathToFile = path.resolve(__dirname, '..', 'db.json');

class Post {
  static async getAll() {
    const data = await fs.readFile(pathToFile, 'utf-8');
    return JSON.parse(data);
  }
  static async getFromTo(from, to) {
    const posts = await Post.getAll();
    return posts.slice(from, to+1);
  }
}

module.exports = Post;
