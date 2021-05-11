import Data from '..';

export default interface CommentData extends Data {
  text: string;
  creator: string;
  comment?: string;
  post?: string;
}
