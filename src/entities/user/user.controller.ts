import { Request, Response } from 'express';import validator from 'validator';
import { addUser, getUserById, removeUser, updateUser } from './user.service';
import { userExceptionMessages } from './constant/userExceptionMessages';
import { userSucessMessages } from './constant/userSucessMessages';
import { uploadImage, validateImageType } from '../../utils/image';

/**
 * The function `getUser` is an asynchronous function that retrieves a user by their ID and returns the
 * result as JSON.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request method, headers, query parameters, and request
 * body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 * @returns a JSON response with the data property set to the result of the getUserById function.
 */
export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    if (!userId) throw new Error(userExceptionMessages.INVALID_ID);

    const result = await getUserById(userId);

    return res.json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success:false, message: (error as Error).message });
  }
};

/**
 * The function `postUser` is an asynchronous function that handles the creation of a new user,
 * including validation of input data and saving an image if provided.
 * @param {Request} req - The `req` parameter is an object representing the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 * @returns a JSON response with the data property set to the result variable.
 */
export const postUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, phone, role, user } = req.body;

    if (!username || !email || !password) {
      throw new Error(userExceptionMessages.USER_CREDENTIALS_REQUIRED);
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
      throw new Error(userExceptionMessages.INVALID_EMAIL_PASS);
    }

    let imageUrl = '';

    if (req.file) {
      const imagePath = req.file!.path;
      validateImageType(req.file.originalname);
      imageUrl = await uploadImage(imagePath);
    }

    await addUser({
      username,
      email,
      password,
      phone,
      role: role ? role : 'user',
      image_url: imageUrl,
      created_by: user.username,
      updated_by: user.username,
    });

    return res.json({ success: true, message: userSucessMessages.POST_SUCESS });
  } catch (error) {
    return res.status(500).json({ success:false, message: (error as Error).message });
  }
};

/**
 * The function `patchUser` is an asynchronous function that updates a user's information, including
 * their username, password, and profile image, and returns the updated user data.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request parameters, etc.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 * @returns a JSON response with the updated user data.
 */
export const patchUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    if (!userId) throw new Error(userExceptionMessages.INVALID_ID);

    const { username, password, user } = req.body;

    if (!username || !password) {
      throw new Error(userExceptionMessages.USERNAME_PASS_REQUIRED);
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
      })
    ) {
      throw new Error(userExceptionMessages.PASS_VALIDATION);
    }

    const currentUser = await getUserById(userId);

    if (!currentUser) {
      throw new Error(userExceptionMessages.USER_NOT_FOUND);
    }

    let imageUrl;
    if (req.file) {
      const imagePath = req.file!.path;
      imageUrl = await uploadImage(imagePath);
    }

    const result = await updateUser(userId, {
      ...currentUser,
      username,
      password,
      image_url: imageUrl ? imageUrl : '',
      updated_by: user.username,
    });

    return res.json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success:false, message: (error as Error).message });
  }
};

/**
 * The deleteUser function is an asynchronous function that removes a user from the system based on the
 * provided user id.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, request headers, request body, request
 * parameters, etc.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 * @returns a JSON response with the data property set to the result of the removeUser function.
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    if (!userId) throw new Error(userExceptionMessages.INVALID_ID);

    const result = await removeUser(userId);

    return res.json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success:false, message: (error as Error).message });
  }
};
