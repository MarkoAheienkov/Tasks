import Data from '..';
import Section from '../Section';

export default interface ArticleData extends Data {
  title: string;
  cover: string;
  approved: boolean;
  creator: string;
  sections: Array<Section>;
}
