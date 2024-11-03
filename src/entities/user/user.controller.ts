import { Request, Response } from 'express';import validator from 'validator';
import { StatusCodes } from 'http-status-codes';

import { userExceptionMessages } from './constant/userExceptionMessages';
import { userSucessMessages } from './constant/userSucessMessages';
import { validateImageType } from '../../utils/image';
import { IUser } from './user.model';

import * as UserService from './user.service';
import { customHttpError } from '../../utils/customErrorHandler';

export const getUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  if (!userId)
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      userExceptionMessages.INVALID_ID,
    );

  const result = await UserService.getUserById(userId);

  return res.json({ success: true, data: result });
};

export const postUser = async (req: Request, res: Response) => {
  const { username, email, password, phone, role, user } = req.body;
  let isImagePresent = false;

  if (!username || !email || !password) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      userExceptionMessages.USER_CREDENTIALS_REQUIRED,
    );
  }

  if (
    !(
      validator.isEmail(email!) &&
      validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
      })
    )
  ) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      userExceptionMessages.INVALID_EMAIL_PASS,
    );
  }

  const userObj: IUser = {
    username,
    email,
    password,
    phone,
    role: role ? role : 'user',
    image_id: null,
    created_by: user.username,
    updated_by: user.username,
  };

  if (!req.file) {
    await UserService.addUser(isImagePresent, user.username, userObj);
  } else {
    isImagePresent = true;

    validateImageType(req.file.originalname);

    const imagePath = req.file!.path;
    const imageName = req.file!.originalname;

    await UserService.addUser(
      isImagePresent,
      user.username,
      userObj,
      imagePath,
      imageName,
    );
  }

  return res.json({ success: true, message: userSucessMessages.POST_SUCESS });
};

export const patchUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  if (!userId)
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      userExceptionMessages.INVALID_ID,
    );

  const { username, password, user } = req.body;
  let isImage = false;

  if (!username || !password) {
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      userExceptionMessages.USERNAME_PASS_REQUIRED,
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
      userExceptionMessages.PASS_VALIDATION,
    );
  }

  const updatedUser = {
    username,
    password,
    image_id: null,
    updated_by: user.username,
  };

  if (!req.file) {
    await UserService.updateUser(isImage, userId, user.name, updatedUser);
  } else {
    isImage = true;
    const imagePath = req.file.path;
    const imageName = req.file.originalname;

    await UserService.updateUser(
      isImage,
      userId,
      user.name,
      updatedUser,
      imagePath,
      imageName,
    );
  }

  return res.json({
    success: true,
    message: userSucessMessages.UPDATE_SUCCESS,
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  if (!userId)
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      userExceptionMessages.INVALID_ID,
    );

  await UserService.removeUser(userId);

  return res.json({
    success: true,
    message: userSucessMessages.DELETE_SUCCESS,
  });
};
