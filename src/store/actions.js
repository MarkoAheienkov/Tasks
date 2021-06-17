export const setAuthTrue = (state, action) => {
  const newState = {...state};
  newState.isAuth = true;
  return newState;
};

export const setAuthFalse = (state, action) => {
  const newState = {...state};
  newState.isAuth = false;
  return newState;
};

export const setUser = (state, action) => {
  const newState = {...state};
  const { pivot } = action;
  const { username, email, isAdmin } = pivot;
  newState.username = username;
  newState.email = email;
  newState.isAdmin = isAdmin;
  return newState;
};

export const clearUser = (state, action) => {
  const newState = {...state};
  newState.username = 'Guest';
  newState.email = '';
  newState.isAdmin = false;
  return newState;
};
