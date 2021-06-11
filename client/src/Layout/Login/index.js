import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import ACTION_TYPES from '../../store/actionTypes';
import './form.css';

const Login = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [username, setUsername] = useState('');

  const usernameChange = (event) => {
    setUsername(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();
    dispatch({
      type: ACTION_TYPES.CHANGE_USERNAME,
      pivot: username,
    });
    history.push('./chat');
  };

  return <form onSubmit={submit} className="form">
      <h1 className="form__title">Join Chat</h1>
      <div className="form__control">
        <label className="form__control__label" for="username">Username:</label>
        <input value={username} onChange={usernameChange} className="form__control__input" id="username" type="text" name="name"/>
      </div>
      <button className="form__submit">Join</button>
    </form>;
};

export default Login;
