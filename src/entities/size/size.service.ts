import { StatusCodes } from 'http-status-codes';
import { customHttpError } from '../../utils/customErrorHandler';
import { ISize } from './size.model';
import * as SizeDAO from './size.repository';
import { sizeErrorMessages } from './constant/sizeErrorMessages';

export const getSizes = async (): Promise<ISize[]> => {
  return await SizeDAO.fetchAll();
};

export const postSize = async (name: string, username: string) => {
  const isSizeAvailable = await SizeDAO.fetchByName(name);

  if (isSizeAvailable)
    throw new customHttpError(
      StatusCodes.CONFLICT,
      sizeErrorMessages.DUPLICATE_NAME,
    );

  const sizeObj: ISize = {
    name,
    created_by: username,
    updated_by: username,
  };
  return await SizeDAO.create(sizeObj);
};

export const patchSizeById = async (sizeId: number, sizeData: ISize) => {
  const currentSize = await SizeDAO.fetchById(sizeId);

  if (!currentSize)
    throw new customHttpError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      sizeErrorMessages.DOESNOT_EXIST,
    );

  return await SizeDAO.update(sizeId, sizeData);
};

export const deleteSize = async (sizeId: number) => {
  const currentSize = await SizeDAO.fetchById(sizeId);

  if (!currentSize)
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      sizeErrorMessages.DOESNOT_EXIST,
    );

  return await SizeDAO.remove(sizeId);
};
