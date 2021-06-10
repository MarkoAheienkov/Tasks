import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { STATUS_CODES, SUCCESS_MESSAGES } from '../../Constants';
import constructLocationError from '../../Helpers/constructLocationError';
import { LOCATIONS } from './constants';
import Users from '../../Entities/user';
import typeORMConnect from '../../Connect/typeORMConnect';
import jwt from 'jsonwebtoken';
import createDateFromNow from '../../Helpers/craeteDateFromNow';

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const user = req.user as Users;
  res.status(STATUS_CODES.SUCCESS);
  res.json({
    email: user.email,
    username: user.username,
    isAdmin: user.is_admin,
  });
  return res;
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { username, email, password } = req.body;
    console.log(typeORMConnect);
    const connection = await typeORMConnect.getConnect();
    console.log('HERE');
    const hashPassword = await bcrypt.hash(password, 12);
    const userRepository = connection.getRepository(Users);
    const user = new Users();
    user.username = username;
    user.email = email;
    user.password = hashPassword;
    user.is_admin = false;
    await userRepository.save(user);
    res.status(STATUS_CODES.CREATED);
    res.json({
      message: SUCCESS_MESSAGES.SUCCESS,
    });
    return res;
  } catch (err) {
    const locationError = constructLocationError(err, LOCATIONS.SIGN_UP);
    return next(locationError);
  }
};

export const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    res.clearCookie('jwt');
    res.json({
      message: SUCCESS_MESSAGES.SUCCESS,
    });
    return res;
  } catch (err) {
    const locationError = constructLocationError(err, LOCATIONS.SIGN_UP);
    return next(locationError);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { email } = req.body;
    const connection = await typeORMConnect.getConnect();
    const userRepository = connection.getRepository(Users);
    const user = await userRepository.findOne({
      where: [{ email: email }],
    });

    const token = jwt.sign(
      {
        id: user?.user_id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '3600s',
      },
    );
    res.status(STATUS_CODES.SUCCESS);
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      expires: createDateFromNow(3600000),
    });
    res.json({
      message: SUCCESS_MESSAGES.SUCCESS,
    });
    return res;
  } catch (err) {
    const locationError = constructLocationError(err, LOCATIONS.SIGN_UP);
    return next(locationError);
  }
};
