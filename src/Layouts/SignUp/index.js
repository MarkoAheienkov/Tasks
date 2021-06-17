import axios from "../../Axios";
import { useState } from "react";
import Form from "../../Components/Shared/Form"
import Button from "../../Components/UI/Button";
import { isEmailValid, isRequired, hasDigit, hasUpperCase, hasSpecialCharacter, hasAtLeastCharacters } from "../../Validators";
import { useHistory } from "react-router";

const SignUp = () => {
  const history = useHistory();
  const [isValid, setIsValid] = useState(false);
  const [requestErrors, setRequestErros] = useState([]);
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
    username: {
      value: '',
      placeholder: 'Username',
      type: 'text',
      isTouched: false,
      isValid: false,
      validators: [
        isRequired('Username is required'),
        hasAtLeastCharacters(4, 'Username must has at least 4 characters'),
      ],
      label: 'Username',
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
        hasAtLeastCharacters(6, 'Username must has at least 6 characters'),
        hasSpecialCharacter('_', 'Password must contains _, uppercase letters and digit'),
        hasUpperCase('Password must contains _, uppercase letters and digit'),
        hasDigit('Password must contains _, uppercase letters and digit'),
      ],
      label: 'Password',
      errors: [],
    },
  });

  const setErrors = (errors = []) => {
    setRequestErros(errors);
  };

  const onSubmit = async () => {
    try {
      const res = await axios.post('auth/sign-up', {
        username: signUpConfigForm.username.value,
        password:signUpConfigForm.password.value,
        email: signUpConfigForm.email.value,
      });
      history.push('/auth/sign-in');
      console.log(res.data);
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  const onInput = () => {
    setRequestErros([]);
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
      <Button disabled={!isValid||requestErrors.length>0} type="submit" btnType="primary">Sign Up</Button>
    </Form>
  </section>;
};

export default SignUp;
