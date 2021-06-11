import { useHistory } from 'react-router';
import './form.css';

const Login = () => {
  const history = useHistory();

  const submit = (event) => {
    event.preventDefault();
    history.push('./chat');
  };

  return <form onSubmit={submit} className="form">
      <h1 className="form__title">Join Chat</h1>
      <div className="form__control">
        <label className="form__control__label" for="username">Username:</label>
        <input className="form__control__input" id="username" type="text" name="name"/>
      </div>
      <button className="form__submit">Join</button>
    </form>;
};

export default Login;
