import { changeUsername, setMessages } from "./actions";
import ACTION_TYPES from "./actionTypes";

const initState = {
  username: '',
  messages: [],
};

const reducer = (state = initState, action) => {
  switch(action.type) {
    case ACTION_TYPES.CHANGE_USERNAME:
      return changeUsername(state, action);
    case ACTION_TYPES.SET_MESSAGES:
      return setMessages(state, action);
    default:
      return state;
  }
};

export default reducer;
