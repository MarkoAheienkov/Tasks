import io from 'socket.io-client';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { URLS, SOCKET_MESSAGE_EVENTS, SOCKET_USER_EVENTS, SOCKET_CONNECTION_EVENTS } from '../Constants';
import { useBeforeUnload } from 'react-use';
import ACTION_TYPES from '../store/actionTypes';

const useCustomChat = (roomId, notAllowed) => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.username);

  const socketRef = useRef(null);

  const getMessages = () => {
    socketRef.current.emit(SOCKET_MESSAGE_EVENTS.GET_MESSAGE, (messages) => {
      dispatch({
        type: ACTION_TYPES.SET_MESSAGES,
        pivot: messages,
      });
    });
  };

  useEffect(() => {
    socketRef.current = io(URLS.SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.emit(SOCKET_USER_EVENTS.LOGIN, {username});

    socketRef.current.on(SOCKET_MESSAGE_EVENTS.GET_MESSAGE, (messages) => {
      dispatch({
        type: ACTION_TYPES.SET_MESSAGES,
        pivot: messages,
      });
    });

    socketRef.current.on(SOCKET_CONNECTION_EVENTS.NOT_ALLOWED, notAllowed);

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, username]);

  const sendMessage = ({ messageText }) => {
    socketRef.current.emit(SOCKET_MESSAGE_EVENTS.ADD_MESSAGE, {
      text: messageText,
      author: username,
      roomId: roomId,
    })
  };

  useBeforeUnload(() => {
    socketRef.current.emit(SOCKET_USER_EVENTS.LOGOUT, username)
  });

  return {
    sendMessage,
    getMessages,
  }

};

export default useCustomChat;
