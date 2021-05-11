import { changeUser } from './actions';
import actionTypes from './actionTypes';

const initState = {
  isAuth: false,
  token: null,
};

const reducer = (state = initState, action) => {
  console.log(action);
  switch(action.type) {
    case(actionTypes.CHANGE_USER):
      return changeUser(state, action);
    default:
      return state;
  }
};

export default reducer;
