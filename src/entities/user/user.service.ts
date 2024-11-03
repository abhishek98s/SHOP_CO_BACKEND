import bcrypt from 'bcrypt';import { StatusCodes } from 'http-status-codes';

import { userExceptionMessages } from './constant/userExceptionMessages';
import * as UserDAO from './user.repository';
import * as ImageService from '../image/image.service';
import { IReturnUser, IUpdateUser, IUser } from './user.model';
import { customHttpError } from '../../utils/customErrorHandler';

/**
 * The function `getUserById` retrieves a user from a database based on their ID and returns it.
 * @param {number} userId - The `userId` parameter is a number that represents the unique identifier of
 * a user.
 * @returns a Promise that resolves to a IUser object.
 */
export const getUserByEmail = async (email: string) => {
  const user: IUser = await UserDAO.findUserByEmail(email);

  if (!user)
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      userExceptionMessages.USER_NOT_FOUND,
    );

  return user;
};

/**
 * The function `getUserById` retrieves a user from a database based on their ID and returns it.
 * @param {number} userId - The `userId` parameter is a number that represents the unique identifier of
 * a user.
 * @returns a Promise that resolves to a IUser object.
 */
export const getUserById = async (userId: number) => {
  const user: IReturnUser = await UserDAO.fetchById(userId);

  if (!user)
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      userExceptionMessages.USER_NOT_FOUND,
    );

  return user;
};

/**
 * The function `addUser` takes in user information, hashes the password, inserts the user into a
 * database, and returns the user.
 * @param {IUser} userInfo - The `userInfo` parameter is an object of type `IUser` which
 * contains information about the user that needs to be added. This information typically includes
 * properties such as `username`, `email`, and `password`.
 * @returns the user object that was inserted into the 'users' table in the database.
 */
export const addUser = async (
  isImage: boolean,
  username: string,
  userData: IUser,
  imagePath?: string,
  imageName?: string,
) => {
  try {
    const password = userData.password;
    let image_id = userData.image_id;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (isImage) {
      image_id = await ImageService.saveImage(imagePath!, imageName!, username);
    }

    const user = await UserDAO.create({
      ...userData,
      image_id,
      password: hashedPassword,
    });

    if (!user.userID)
      throw new customHttpError(
        StatusCodes.REQUEST_TOO_LONG,
        userExceptionMessages.CREATE_FAILED,
      );

    const { userID } = user;

    return await UserDAO.fetchById(userID);
  } catch (error) {
    const err = error as Error;
    if (err.message === userExceptionMessages.DUPLICATE_EMAIL) {
      // Handle duplicate email error specifically
      throw new customHttpError(
        StatusCodes.CONFLICT,
        userExceptionMessages.DUPLICATE_EMAIL,
      );
    }
  }
};

/**
 * The function updates a user's information in the database and returns the updated user.
 * @param {number} userId - The `userId` parameter is the unique identifier of the user that needs to
 * be updated. It is of type `number`.
 * @param {IUser} updatedUserInfo - The `updatedUserInfo` parameter is an object of type
 * `IUser` that contains the updated information for the user.
 * @returns the updated user information.
 */
export const updateUser = async (
  isImage: boolean,
  userId: number,
  username: string,
  updatedUserData: IUpdateUser,
  imagePath?: string,
  imageName?: string,
) => {
  const currentUser = await getUserById(userId);
  let image_id = updatedUserData.image_id;

  if (!currentUser) {
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      userExceptionMessages.USER_NOT_FOUND,
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(updatedUserData.password, salt);

  if (isImage) {
    image_id = await ImageService.saveImage(imagePath!, imageName!, username);
  }

  const updatedUser = {
    ...currentUser,
    ...updatedUserData,
    password: hashedPassword,
    image_id,
  };

  delete updatedUser.image_url;

  const user = await UserDAO.update(updatedUser, userId);

  if (!user)
    throw new customHttpError(
      StatusCodes.REQUEST_TOO_LONG,
      userExceptionMessages.UPDATE_FAILED,
    );

  return;
};

/**
 * The function removes a user from the database by their ID and returns the deleted user.
 * @param {number} userId - The `userId` parameter is the unique identifier of the user that needs to
 * be removed from the database.
 * @returns the deleted user object.
 */
export const removeUser = async (userId: number): Promise<void> => {
  const currentUser = await getUserById(userId);
  if (!currentUser)
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      userExceptionMessages.USER_NOT_FOUND,
    );

  const user = await UserDAO.remove(userId);
  if (!user)
    throw new customHttpError(
      StatusCodes.REQUEST_TOO_LONG,
      userExceptionMessages.DELETE_FAILED,
    );

  return;
};
