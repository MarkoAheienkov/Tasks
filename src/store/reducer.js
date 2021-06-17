import { clearUser, setAuthFalse, setAuthTrue, setUser } from './actions';
import actionTypes from './actionTypes';

const initState = {
  isAuth: false,
  username: 'Guest',
  email: '',
  isAdmin: false,
};

const reducer = (state = initState, action) => {
  switch(action.type) {
    case(actionTypes.SET_AUTH_TRUE):
      return setAuthTrue(state, action);
    case(actionTypes.SET_AUTH_FALSE):
      return setAuthFalse(state, action);
    case(actionTypes.SET_USER):
      return setUser(state, action);
    case(actionTypes.CLEAR_USER):
      return clearUser(state, action);
    default:
      return state;
  }
};

export default reducer;
