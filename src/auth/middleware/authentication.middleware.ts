import { NextFunction, Request, Response } from 'express';import jwt from 'jsonwebtoken';
import { customHttpError } from '../../utils/customErrorHandler';
import { StatusCodes } from 'http-status-codes';
import { authExceptionMessages } from '../constant/authExceptionMessages';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers['authorization'];
    if (!token)
      throw new customHttpError(
        StatusCodes.UNAUTHORIZED,
        authExceptionMessages.INVALID_TOKEN,
      );

    jwt.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_TOKEN as string,
      (err, decoded) => {
        if (err) {
          throw new customHttpError(
            StatusCodes.UNAUTHORIZED,
            authExceptionMessages.INVALID_TOKEN,
          );
        }
        req.body.user = decoded;
        next();
      },
    );
  } catch (error) {
    res.status(401).json({ success: false, message: (error as Error).message });
  }
};
