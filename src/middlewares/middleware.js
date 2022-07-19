import model from './../database/models';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import AppError from './../utils/appError';
import catchAsync from './../utils/catchAsync';
import dotenv from 'dotenv';

/**
 * Get User model
 */

const User = model.User;

dotenv.config();

/**
 * This middleware  ensures that the user is logged in
 */

export const protect = catchAsync(async (req, res, next) => {
  let token;

  /**
   * Get token sent along with the request
   * Check if headers.authorization has a token
   * The token should starts with a Bearer keyword
   */
  console.log(req.headers)

  if (req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  /**
   * Send a generic message if no token found
   */

  if (!token) {
    return next(
      new AppError('You are not allowed to perform this action', 401)
    );
  }

  /**
   * Token verification and decoding
   * Get user info from the token
   */

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETE);
  const uuid = decoded.uuid;

  /**
   * Check if the user is who he claimed to be
   * Using id decoded from the token to find user from database
   */

  const freshUser = await User.findOne({ where: { uuid } });

  /**
   * Send error message if no user found with ID decoded from token
   */

  if (!freshUser) {
    return next(
      new AppError("User belonging to this token does'nt exist", 401)
    );
  }

  /**
   * Send entire user object to the request if successfully found
   */

  req.user = freshUser;

  next();
});

/**
 * This middleware ensures that the user has ability to access a certain resource
 */

export const restrictRoleTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roleName)) {
      return res.status(403).json({
        message: 'You are not permitted to perform this action',
      });
    }
    next();
  };
};

/**
 * Calculating Number of days from when the user was registered
 */

export const calculateDays = (req, res, next) => {

  /**
   * Get today's Date
   */

  const Today = new Date();

  /**
   * Get date when user was registered
   */

  const userCreatedAt = req.user.dataValues.createdAt;

  /**
   * Find difference between Today and the time when user was registered
   */

  const difference = Today.getTime() - userCreatedAt.getTime();

  /**
   * Converting the difference into Days
   */

  const TotalDyas = Math.ceil(difference / (1000 * 3600 * 24));
  
  /**
   * Restricting user from accessing some features if free trial was expired
   */

  if(TotalDyas>7){

   return next(new AppError('Your free trial was expired, Please upgrade your Account ',403))

  }

  next();
};
