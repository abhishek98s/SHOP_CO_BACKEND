import { StatusCodes } from 'http-status-codes';import { imageExceptionMessages } from './constant/imageExceptionMessages';
import * as ImageDAO from './image.repository';
import { IImage } from './image.model';
import { customHttpError } from '../../utils/customErrorHandler';

export const findImage = async (imageId: number): Promise<IImage> => {
  const image: IImage = await ImageDAO.fetchById(imageId);
  if (!image)
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      imageExceptionMessages.IMAGE_NOT_FOUND,
    );

  return image;
};

export const saveImage = async (
  imagePath: string,
  imageName: string,
  username: string,
): Promise<number> => {
  // const url = await uploadImage(imagePath);
  const url =
    'https://tse1.mm.bing.net/th?&id=OVP.ndEpbTsn7FXjzgBPGNO7vgHgFo&w=197&h=110&c=7&pid=1.7&rs=1';

  const newImage: IImage = {
    url,
    caption: imageName,
    created_by: username,
    updated_by: username,
  };

  const image = await ImageDAO.create(newImage);
  const { image_id } = image;

  return image_id;
};

export const updateImage = async (
  imagePath: string,
  imageName: string,
  username: string,
  imageId: number,
): Promise<void> => {
  const updatedImage: IImage = {
    url: imagePath,
    caption: imageName,
    updated_by: username,
  };

  const image = await ImageDAO.update(updatedImage, imageId);

  if (!image)
    throw new customHttpError(
      StatusCodes.REQUEST_TOO_LONG,
      imageExceptionMessages.UPLOAD_FAILED,
    );

  return;
};

export const removeImage = async (imageId: number): Promise<void> => {
  const image = await ImageDAO.fetchById(imageId);
  if (!image)
    throw new customHttpError(
      StatusCodes.NOT_FOUND,
      imageExceptionMessages.IMAGE_NOT_FOUND,
    );

  const removeImage = await ImageDAO.remove(imageId);
  if (!removeImage)
    throw new customHttpError(
      StatusCodes.REQUEST_TOO_LONG,
      imageExceptionMessages.DELETE_FAILED,
    );

  return;
};
