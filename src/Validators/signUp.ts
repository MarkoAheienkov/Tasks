import emailValidators from './signUp/email';
import passwordValidators from './signUp/password';
import usernameValidators from './signUp/username';

const signUpValidators = [
  emailValidators,
  usernameValidators,
  passwordValidators,
];

export default signUpValidators;
