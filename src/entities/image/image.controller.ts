import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as ImageService from './image.service';
import { imageExceptionMessages } from './constant/imageExceptionMessages';
import { imageSuccessMessages } from './constant/imageSuccessMessages';
import { validateImageType } from '../../utils/image';
import { customHttpError } from '../../utils/customErrorHandler';

/**
 * The function `getImage` is an asynchronous function that handles a request to retrieve an image by
 * its ID and returns the image data if found, or an error message if not found or if there is an
 * internal server error.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, query parameters, and body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the HTTP
 * response back to the client. It contains methods and properties that allow you to set the response
 * status code, headers, and body. In this code snippet, it is used to send a JSON response with the
 * image data or
 * @returns a response with the status code 200 (OK) and a JSON object containing the data of the
 * image.
 */
export const getImage = async (req: Request, res: Response) => {
  const imageId: number = parseInt(req.params.id);

  if (!imageId)
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      imageExceptionMessages.INVALID_ID,
    );

  const result = await ImageService.findImage(imageId);

  return res.status(StatusCodes.OK).json({ success: true, data: result });
};

/**
 * The `postImage` function handles the uploading and saving of an image file, including validation and
 * error handling.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 * @returns a JSON response with the data property set to the result of the saveImage function.
 */
export const postImage = async (req: Request, res: Response) => {
  if (!req.file) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      imageExceptionMessages.FILE_REQUIRED,
    );
  }

  validateImageType(req.file!.originalname);

  const { user } = req.body;

  const imagePath = req.file!.path;
  const imageName = req.file!.originalname;

  await ImageService.saveImage(imagePath, imageName, user.username);

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: imageSuccessMessages.POST_SUCCESS });
};

/**
 * The function `patchImage` is an asynchronous function that handles the patch request for updating an
 * image with the specified ID, including uploading a new image file if provided.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, request
 * URL, and other relevant details.
 * @param {Response} res - The `res` parameter is the response object that is used to send the HTTP
 * response back to the client. It is an instance of the `Response` class from the Express framework.
 * @returns a JSON response with the updated image data if successful, or an error message and status
 * code if there is an error.
 */
export const patchImage = async (req: Request, res: Response) => {
  const imageId: number = parseInt(req.params.id);

  if (!req.file) {
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      imageExceptionMessages.FILE_REQUIRED,
    );
  }

  const { user } = req.body;

  await ImageService.findImage(imageId);

  const imagePath = req.file!.path;
  const imageName = req.file!.originalname;

  await ImageService.updateImage(imagePath, imageName, user.username, imageId);

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: imageSuccessMessages.UPDATE_SUCCESS });
};

/**
 * The function `deleteImage` is an asynchronous function that handles the deletion of an image based
 * on the provided image ID.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, query parameters, and request
 * body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @returns a JSON response with the data property set to the result of the removeImage function.
 */
export const deleteImage = async (req: Request, res: Response) => {
  const imageId: number = parseInt(req.params.id);

  if (!imageId)
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      imageExceptionMessages.INVALID_ID,
    );

  await ImageService.removeImage(imageId);

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: imageSuccessMessages.DELETE_SUCCESS });
};
