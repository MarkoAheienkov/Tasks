export const URLS = {
  SERVER_URL: 'http://localhost:4000/',
};

export const SOCKET_MESSAGE_EVENTS = {
  ADD_MESSAGE: 'message:add',
  GET_MESSAGE: 'message:get',
};

export const SOCKET_USER_EVENTS = {
  LOGIN: 'user:login',
  LOGOUT: 'user:logout',
};

export const SOCKET_CONNECTION_EVENTS = {
  CONNECT: 'connection',
  DISCONNECT: 'disconnect',
  NOT_ALLOWED: 'not allowed',
};
