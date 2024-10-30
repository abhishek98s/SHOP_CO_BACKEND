import { imageExceptionMessages } from '../entities/image/constant/imageExceptionMessages';
import cloudinary from './cloudinaryUpload';

export const uploadImage = async (imgPath: string) => {
  const imgUrl = (
    await cloudinary.v2.uploader.upload(imgPath, { folder: 'shop_co' })
  ).secure_url;
  if (!imgUrl) throw new Error(imageExceptionMessages.UPLOAD_FAILED);

  return imgUrl;
};

export const validateImageType = (fileName: string) => {
  const imageType = fileName.split('.').pop() as string;

  const reg: RegExp = new RegExp(/\b(?:png|jpg|jpeg|gif)\b/i);
  const isValidType = reg.test(imageType);

  if (!isValidType) throw new Error(imageExceptionMessages.INVALID_IMAGE_TYPE);
  return;
};
