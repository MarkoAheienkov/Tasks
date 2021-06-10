import passport from '../Passport';

const isAuth = passport.authenticate('jwt', { session: false });

export default isAuth;
