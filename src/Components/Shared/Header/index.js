import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../Axios';
import Button from '../../UI/Button';
import Toggle from '../../UI/Toggle';
import classes from './Header.module.css';
import actionTypes from '../../../store/actionTypes'
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';

const Header = ({toggleClick}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = useSelector(state => state.isAuth);
  const click = async () => {
    try {
      await axios.post('/auth/log-out');
      dispatch({ type: actionTypes.SET_AUTH_FALSE });
      dispatch({ type: actionTypes.CLEAR_USER });
      history.push('/auth/sign-in');
    } catch (err) {
      console.log(err);
    }
  };

  return <>
    <header className={classes.Header}>
      <Toggle toggleClick={toggleClick}/>
      {
        isAuth ?
        <Button btnType='inline-primary white' type="button" click={click}>Log Out</Button>:
        <div>
          <NavLink
            className={classes.NavLink}
            activeClassName={classes.Active}
            to="/auth/sign-in">Login /
          </NavLink>
          
          <NavLink
            className={classes.NavLink}
            activeClassName={classes.Active}
            to="/auth/sign-up"> Sign Up
          </NavLink>
        </div>
      }      
    </header>
  </>;
};

export default Header;
