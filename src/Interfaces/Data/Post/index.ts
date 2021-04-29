import Data from '..';

export default interface PostData extends Data {
  title: string;
  body: string;
  creator: string;
}
