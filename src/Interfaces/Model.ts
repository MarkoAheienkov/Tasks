import Data from './Data';

export default interface Model {
  toObject(): Data;
  remove(): void;
}
