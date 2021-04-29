import Data from '..';

export default interface ArticleData extends Data {
  title: string;
  body: string;
  approved: boolean;
  creator: string;
}
