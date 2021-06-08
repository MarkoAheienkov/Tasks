import { Request } from 'express';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import RequestError from '../Classes/Errors/RequestError';
import typeORMConnector from '../Connect/typeORMConnect';
import { ERROR_MESSAGES, STATUS_CODES } from '../Constants';
import Users from '../Entities/user';
const JWTStrategy = passportJWT.Strategy;

const cookieExtractor = (req: Request): string | null => {
  let jwt = null;
  if (req && req.cookies) {
    jwt = req.cookies['jwt'];
  }
  return jwt;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET as string,
};

const verify = async (jwtPayload: any, done: any): Promise<any> => {
  const { exp, id } = jwtPayload;
  if (Date.now() > exp * 1000) {
    const requestError = new RequestError(
      ERROR_MESSAGES.AUTHORIZATION_PROBLEM,
      STATUS_CODES.AUTHORIZATION_PROBLEM,
    );
    return done(requestError, false);
  }
  const connection = await typeORMConnector.getConnect();
  const userRepository = connection.getRepository(Users);
  const user = await userRepository.findOne({
    where: [{ user_id: id }],
  });
  if (!user) {
    const requestError = new RequestError(
      ERROR_MESSAGES.AUTHORIZATION_PROBLEM,
      STATUS_CODES.AUTHORIZATION_PROBLEM,
    );
    return done(requestError, false);
  }
  return done(null, user);
};

passport.use('jwt', new JWTStrategy(options, verify));

export default passport;
