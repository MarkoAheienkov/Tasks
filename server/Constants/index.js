module.exports.ERROR_MESSAGES = {
  AUTHORIZATION_PROBLEM: 'Authorization problem',
  SERVER_ERROR: 'Server error',
};

module.exports.STATUS_CODES = {
  AUTHORIZATION_PROBLEM: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  VALIDATION_ERROR: 400,
  SUCCESS: 200,
  CREATED: 201,
};

module.exports.ERRORS = {
  SERVER_ERROR: 'Server Error',
  REQUEST_ERROR: 'Request Error',
};

module.exports.SUCCESS_MESSAGES = {
  SUCCESS: 'success',
};

module.exports.MODES = {
  DEVELOPMENT: 'development',
  TEST: 'test',
};

module.exports.SOCKET_USER_EVENTS = {
  LOGIN: 'user:login',
  LOGOUT: 'user:logout',
};

module.exports.SOCKET_MESSAGE_EVENTS = {
  GET_MESSAGE: 'message:get',
  ADD_MESSAGE: 'message:add',
};

module.exports.SOCKET_CONNECTION_EVENTS = {
  CONNECT: 'connection',
  DISCONNECT: 'disconnect',
  NOT_ALLOWED: 'not allowed',
};

module.exports.CONSTANTS = {
  MAX_ROOM_PARTICIPANTS: 2,
};
