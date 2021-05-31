import PostData from '../Interfaces/Data/Post';

const posts: Array<PostData> = [
  {
    id: '1',
    title: 'Post 1',
    body: '<p>Some text for post 1</p>',
    creator: '1',
  },
  {
    id: '2',
    title: 'Post 2',
    body: '<p>Some text for post 2</p>',
    creator: '2',
  },
];

const postsDB = {
  records: posts,
  setRecords(records: Array<PostData>): void {
    this.records = [...records];
  },
};

export default postsDB;
