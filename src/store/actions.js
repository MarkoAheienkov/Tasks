export const changeUser = (state, action) => {
  const {pivot} = action;
  const newState = {...state};
  switch(pivot) {
    case('guest'):
      newState.isAuth = false;
      newState.token = null;
      break;
    case('admin'):
      newState.isAuth = true;
      newState.token = 'admin';
      break;
    case('user'):
      newState.isAuth = true;
      newState.token = 'user';
      break;
    case('moderator'):
      newState.isAuth = true;
      newState.token = 'moderator';
      break;
    default:
      newState.isAuth = false;
      newState.token = null;
      break;
  }
  return newState;
};
