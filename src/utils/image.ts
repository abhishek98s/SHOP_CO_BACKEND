import { StatusCodes } from 'http-status-codes';
import { imageExceptionMessages } from '../entities/image/constant/imageExceptionMessages';
import cloudinary from './cloudinaryUpload';
import { customHttpError } from './customErrorHandler';

export const uploadImage = async (imgPath: string) => {
  const imgUrl = (
    await cloudinary.v2.uploader.upload(imgPath, { folder: 'shop_co' })
  ).secure_url;
  if (!imgUrl)
    throw new customHttpError(
      StatusCodes.REQUEST_TOO_LONG,
      imageExceptionMessages.UPLOAD_FAILED,
    );

  return imgUrl;
};

export const validateImageType = (fileName: string) => {
  const imageType = fileName.split('.').pop() as string;

  const reg: RegExp = new RegExp(/\b(?:png|jpg|jpeg|gif)\b/i);
  const isValidType = reg.test(imageType);

  if (!isValidType)
    throw new customHttpError(
      StatusCodes.UNSUPPORTED_MEDIA_TYPE,
      imageExceptionMessages.INVALID_IMAGE_TYPE,
    );
  return;
};
