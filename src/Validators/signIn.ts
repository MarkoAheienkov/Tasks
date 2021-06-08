import emailValidators from './signIn/email';
import passwordValidators from './signIn/password';

const signInValidators = [emailValidators, passwordValidators];

export default signInValidators;
