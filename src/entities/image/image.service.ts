import { imageExceptionMessages } from './constant/imageExceptionMessages';
import * as ImageDAO from './image.repository';
import { IImage } from './image.model';

export const findImage = async (imageId: number): Promise<IImage> => {
  const image: IImage = await ImageDAO.fetchById(imageId);
  if (!image) throw new Error(imageExceptionMessages.IMAGE_NOT_FOUND);

  return image;
};

export const saveImage = async (
  imageData: IImage,
  username: string,
): Promise<IImage> => {
  const newImage: IImage = {
    ...imageData,
    created_by: username,
    updated_by: username,
  };
  const image = await ImageDAO.create(newImage);
  const { image_id } = image;
  return await ImageDAO.fetchById(image_id);
};

export const updateImage = async (
  imageData: IImage,
  imageId: number,
): Promise<void> => {
  const image = await ImageDAO.update(imageData, imageId);

  if (!image) throw new Error(imageExceptionMessages.UPLOAD_FAILED); // update the comment

  return;
};

export const removeImage = async (imageId: number): Promise<void> => {
  const image = await ImageDAO.fetchById(imageId);
  if (!image) throw new Error(imageExceptionMessages.IMAGE_NOT_FOUND);

  const removeImage = await ImageDAO.remove(imageId);
  if (!removeImage) throw new Error(imageExceptionMessages.DELETE_FAILED);

  return;
};
