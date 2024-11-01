import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { StatusCodes } from 'http-status-codes';

import { authExceptionMessages } from './constant/authExceptionMessages';
import { addUser, getUserByEmail } from '../entities/user/user.service';
import { authSuccessMessages } from './constant/authSuccessMessages';

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error(authExceptionMessages.EMAIL_PASS_REQUIRED);
    }

    const user = await getUserByEmail(email);

    const { username, id, phone, email: dbEmail, role } = user;

    const passordMatched: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passordMatched) {
      throw new Error(authExceptionMessages.INVALID_ID_CREDENTIALS);
    }

    const token = jwt.sign(
      { id, username, phone, email: dbEmail, role },
      process.env.JWT_TOKEN as string,
    );

    res.status(StatusCodes.OK).json({ success: true, data: { token } });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: (error as Error).message });
  }
};

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role, phone } = req.body;
    let isImage = false;

    if (!username || !email || !password || !phone) {
      throw new Error(authExceptionMessages.USER_CREDENTIALS);
    }

    if (!validator.isEmail(email)) {
      throw new Error(authExceptionMessages.INVALID_EMAIL);
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
      })
    ) {
      throw new Error(authExceptionMessages.PASS_VALIDATION);
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
  } catch (error: unknown) {
    res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ success: false, message: (error as Error).message });
  }
};
