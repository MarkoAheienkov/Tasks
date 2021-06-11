export const changeUsername = (state, action) => {
  const newState = {...state};
  const { pivot } = action;
  newState.username = pivot;
  return newState;
};

export const setMessages = (state, action) => {
  const newState = {...state};
  const { pivot } = action;
  newState.messages = [...pivot];
  return newState; 
};
