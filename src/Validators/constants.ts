export const LOCATIONS = {
  SING_IN_EMAIL_NOT_IN_USE: '[signIn, emailNotInUse]',
  SING_IN_PASSWROD_IS_NOT_COORECT: '[signIn, passwordIsNotCorrect]',
  SIGN_UP_EMAIL_IS_IN_USE: '[signUp, emailIsInUse]',
};

export const SIGN_IN_VALIDATORS_MESSAGES = {
  EMAIL_IS_NOT_CORRECT: 'Email or password is not correct',
  PASSWORD_IS_NOT_CORRECT: 'Email or password is not correct',
  EMAIL_IS_NOT_VALID: 'Email must be valid',
};

export const SIGN_UP_VALIDATORS_MESSAGES = {
  EMAIL_IS_IN_USE: 'Email is in use',
  PASSWORD_MUST_BE_VALID: 'Password must contain _, digit, uppercase',
  EMAIL_IS_NOT_VALID: 'Email is not valid',
  PASSWORD_LENGTH: 'Password must be at least 6 characters',
  USERNAME_LENGTH: 'Username must be at least 4 characters',
};
