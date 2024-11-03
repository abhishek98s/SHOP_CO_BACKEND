import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { StatusCodes } from 'http-status-codes';

import { authExceptionMessages } from './constant/authExceptionMessages';
import { addUser, getUserByEmail } from '../entities/user/user.service';
import { authSuccessMessages } from './constant/authSuccessMessages';
import { customHttpError } from '../utils/customErrorHandler';

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      authExceptionMessages.EMAIL_PASS_REQUIRED,
    );
  }

  const user = await getUserByEmail(email);

  const { username, id, phone, email: dbEmail, role } = user;

  const passordMatched: boolean = await bcrypt.compare(password, user.password);

  if (!passordMatched) {
    throw new customHttpError(
      StatusCodes.UNAUTHORIZED,
      authExceptionMessages.INVALID_ID_CREDENTIALS,
    );
  }

  const token = jwt.sign(
    { id, username, phone, email: dbEmail, role },
    process.env.JWT_TOKEN as string,
  );

  res.status(StatusCodes.OK).json({ success: true, data: { token } });
};

export const registerHandler = async (req: Request, res: Response) => {
  const { username, email, password, role, phone } = req.body;
  let isImage = false;

  if (!username || !email || !password || !phone) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      authExceptionMessages.USER_CREDENTIALS,
    );
  }

  if (!validator.isEmail(email)) {
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      authExceptionMessages.INVALID_EMAIL,
    );
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
  ) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      authExceptionMessages.PASS_VALIDATION,
    );
  }

  const userObj = {
    username,
    email,
    password,
    phone,
    role: role ? role : 'user',
    image_id: null,
    created_by: username,
    updated_by: username,
  };

  if (!req.file) {
    await addUser(isImage, username, userObj);
  } else {
    isImage = true;

    const imagePath = req.file.path;
    const imageName = req.file.originalname;

    await addUser(isImage, username, userObj, imagePath, imageName);
  }

  res.json({ success: true, message: authSuccessMessages.REGISTER_SUCCESS });
};
