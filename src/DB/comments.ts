import CommentData from '../Interfaces/Data/Comment';

const records: Array<CommentData> = [
  {
    id: '1',
    text: 'First comment for post 1',
    creator: '1',
    post: '1',
  },
  {
    id: '2',
    text: 'Second comment for post 1',
    creator: '1',
    post: '1',
  },
  {
    id: '3',
    text: 'Reply for first comment',
    creator: '1',
    comment: '1',
  },
];

const commnetsDB = {
  records: records,
  setRecords(records: Array<CommentData>): void {
    this.records = [...records];
  },
};

export default commnetsDB;
