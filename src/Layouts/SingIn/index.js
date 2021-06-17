import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Form from "../../Components/Shared/Form"
import Button from "../../Components/UI/Button";
import actionTypes from "../../store/actionTypes";
import { isEmailValid, isRequired, } from "../../Validators";

const SignIn = () => {
  const history = useHistory();
  const [isValid, setIsValid] = useState(false);
  const [requestErrors, setRequestErros] = useState([]);
  const dispatch = useDispatch();
  const [signUpConfigForm, setSignUpConfigForm] = useState({
    email: {
      value: '',
      placeholder: 'Email',
      type: 'email',
      isTouched: false,
      isValid: false,
      validators: [
        isRequired('Email is required'),
        isEmailValid('Email is not valid'),
      ],
      label: 'Email',
      errors: [],
    },
    password: {
      value: '',
      placeholder: 'Password',
      type: 'password',
      isTouched: false,
      isValid: false,
      validators: [
        isRequired('Password is required'),
      ],
      label: 'Password',
      errors: [],
    },
  });

  const onInput = () => {
    setRequestErros([]);
  };

  const setErrors = (errors = []) => {
    setRequestErros(errors);
  };

  const onSubmit = async () => {
    try {
      await axios.post('auth/sign-in', {
        password:signUpConfigForm.password.value,
        email: signUpConfigForm.email.value,
      });
      const res = await axios.get('auth/user');
      const {email, username, isAdmin} = res.data;
      dispatch({ type: actionTypes.SET_AUTH_TRUE });
      dispatch({ type: actionTypes.SET_USER, pivot: {
        email,
        username,
        isAdmin,
      } });
      history.push('/');
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };



  return <section className='container'>
    <Form
      config={signUpConfigForm}
      onSubmit={onSubmit}
      setConfigChange={setSignUpConfigForm}
      setIsValid={setIsValid}
      errors={requestErrors}
      onInput={onInput}
    >
      <Button disabled={!isValid || requestErrors.length > 0} type="submit" btnType="primary">Login</Button>
    </Form>
  </section>;
};

export default SignIn;
