import { StatusCodes } from 'http-status-codes';
import { customHttpError } from '../../utils/customErrorHandler';
import { IStyle } from './style.model';
import * as StyleDAO from './style.repository';
import { styleErrorMessages } from './constant/styleErrorMessages';

export const getStyles = async (): Promise<IStyle[]> => {
  return await StyleDAO.fetchAll();
};

export const postStyle = async (name: string, username: string) => {
  const isStyleAvailable = await StyleDAO.fetchByName(name);

  if (isStyleAvailable)
    throw new customHttpError(
      StatusCodes.CONFLICT,
      styleErrorMessages.DUPLICATE_NAME,
    );

  const styleObj: IStyle = {
    name,
    created_by: username,
    updated_by: username,
  };
  return await StyleDAO.create(styleObj);
};

export const patchStyleById = async (styleId: number, styleData: IStyle) => {
  const currentStyle = await StyleDAO.fetchById(styleId);

  if (!currentStyle)
    throw new customHttpError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      styleErrorMessages.DOESNOT_EXIST,
    );

  return await StyleDAO.update(styleId, styleData);
};

export const deleteStyle = async (styleId: number) => {
  const currentStyle = await StyleDAO.fetchById(styleId);

  if (!currentStyle)
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      styleErrorMessages.DOESNOT_EXIST,
    );

  return await StyleDAO.remove(styleId);
};
