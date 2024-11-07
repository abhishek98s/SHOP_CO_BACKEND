import { StatusCodes } from 'http-status-codes';
import { customHttpError } from '../../utils/customErrorHandler';
import { IType } from './type.model';
import * as TypeDAO from './type.repository';
import { typeErrorMessages } from './constant/typeErrorMessages';

export const getTypes = async (): Promise<IType[]> => {
  return await TypeDAO.fetchAll();
};

export const postType = async (name: string, username: string) => {
  const isTypeAvailable = await TypeDAO.fetchByName(name);

  if (isTypeAvailable)
    throw new customHttpError(
      StatusCodes.CONFLICT,
      typeErrorMessages.DUPLICATE_NAME,
    );

  const typeObj: IType = {
    name,
    created_by: username,
    updated_by: username,
  };
  return await TypeDAO.create(typeObj);
};

export const patchTypeById = async (typeId: number, typeData: IType) => {
  const currentType = await TypeDAO.fetchById(typeId);

  if (!currentType)
    throw new customHttpError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      typeErrorMessages.DOESNOT_EXIST,
    );

  return await TypeDAO.update(typeId, typeData);
};

export const deleteType = async (typeId: number) => {
  const currentType = await TypeDAO.fetchById(typeId);

  if (!currentType)
    throw new customHttpError(
      StatusCodes.BAD_REQUEST,
      typeErrorMessages.DOESNOT_EXIST,
    );

  return await TypeDAO.remove(typeId);
};
